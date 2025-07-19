#!/bin/bash

# Website Deployment Script
# Builds and deploys a Vite React app to VPS

set -euo pipefail

# Configuration - EDIT THESE VALUES
VPS_HOST="45.63.0.91"
VPS_USER="web"
VPS_PORT="22"
REMOTE_DIR="/var/www/html"
LOCAL_BUILD_DIR="dist"  # Vite default build directory

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Functions
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}→${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}!${NC} $1"
}

# Parse command line arguments
SKIP_BUILD=false
BACKUP=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --no-backup)
            BACKUP=false
            shift
            ;;
        --host)
            VPS_HOST="$2"
            shift 2
            ;;
        --user)
            VPS_USER="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [options]"
            echo "Options:"
            echo "  --skip-build    Skip the build step"
            echo "  --no-backup     Don't backup existing files on server"
            echo "  --host HOST     Override VPS host"
            echo "  --user USER     Override VPS user (default: web)"
            echo "  --help          Show this help message"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Check prerequisites
print_info "Checking prerequisites..."

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install Node.js and npm."
    exit 1
fi

if ! command -v ssh &> /dev/null; then
    print_error "ssh is not installed."
    exit 1
fi

if ! command -v rsync &> /dev/null; then
    print_warning "rsync is not installed. Falling back to scp (slower)."
    USE_SCP=true
else
    USE_SCP=false
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Are you in the project directory?"
    exit 1
fi

# Build the project
if [ "$SKIP_BUILD" = false ]; then
    print_info "Building the project..."
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        print_info "Installing dependencies..."
        npm install
    fi
    
    # Run build
    npm run build
    
    if [ $? -ne 0 ]; then
        print_error "Build failed!"
        exit 1
    fi
    
    print_status "Build completed successfully"
else
    print_warning "Skipping build step (--skip-build flag)"
fi

# Check if build directory exists
if [ ! -d "$LOCAL_BUILD_DIR" ]; then
    print_error "Build directory '$LOCAL_BUILD_DIR' not found. Did the build succeed?"
    exit 1
fi

# Test SSH connection
print_info "Testing SSH connection..."
if ! ssh -p "$VPS_PORT" -o ConnectTimeout=5 -o BatchMode=yes "$VPS_USER@$VPS_HOST" exit 2>/dev/null; then
    print_error "Cannot connect to $VPS_USER@$VPS_HOST:$VPS_PORT"
    print_error "SSH authentication failed. This could be due to:"
    print_error "  1. SSH agent not running - run 'eval \$(ssh-agent -s)' and 'ssh-add ~/.ssh/your_key'"
    print_error "  2. SSH key not added to agent - run 'ssh-add ~/.ssh/your_key'"
    print_error "  3. SSH key not authorized on server - add your public key to ~/.ssh/authorized_keys on the server"
    print_error "  4. Incorrect SSH configuration - check your ~/.ssh/config file"
    print_error ""
    print_error "To start SSH agent and add your key:"
    print_error "  eval \$(ssh-agent -s)"
    print_error "  ssh-add ~/.ssh/id_rsa  # or your specific key file"
    exit 1
fi
print_status "SSH connection successful"

# Create backup on remote if requested
if [ "$BACKUP" = true ]; then
    print_info "Creating backup on remote server..."
    TIMESTAMP=$(date +%Y%m%d-%H%M%S)
    ssh -p "$VPS_PORT" "$VPS_USER@$VPS_HOST" "
        if [ -d '$REMOTE_DIR' ] && [ \"\$(ls -A $REMOTE_DIR 2>/dev/null)\" ]; then
            mkdir -p ~/deployments/backup-$TIMESTAMP
            cp -r $REMOTE_DIR/* ~/deployments/backup-$TIMESTAMP/
            echo 'Backup created at ~/deployments/backup-$TIMESTAMP'
        else
            echo 'No existing files to backup'
        fi
    "
fi

# Deploy files
print_info "Deploying files to $VPS_HOST..."

if [ "$USE_SCP" = false ]; then
    # Use rsync (preferred method)
    rsync -avz --delete \
        -e "ssh -p $VPS_PORT" \
        "$LOCAL_BUILD_DIR/" \
        "$VPS_USER@$VPS_HOST:$REMOTE_DIR/"
    
    if [ $? -eq 0 ]; then
        print_status "Deployment completed successfully with rsync"
    else
        print_error "Deployment failed"
        exit 1
    fi
else
    # Fallback to scp
    print_warning "Using scp (this may take longer)..."
    
    # Create temp archive
    TEMP_ARCHIVE="/tmp/deploy-$(date +%s).tar.gz"
    tar -czf "$TEMP_ARCHIVE" -C "$LOCAL_BUILD_DIR" .
    
    # Copy archive
    scp -P "$VPS_PORT" "$TEMP_ARCHIVE" "$VPS_USER@$VPS_HOST:/tmp/"
    
    # Extract on remote
    ssh -p "$VPS_PORT" "$VPS_USER@$VPS_HOST" "
        rm -rf $REMOTE_DIR/*
        tar -xzf $TEMP_ARCHIVE -C $REMOTE_DIR/
        rm $TEMP_ARCHIVE
    "
    
    # Clean up local temp file
    rm "$TEMP_ARCHIVE"
    
    print_status "Deployment completed successfully with scp"
fi

# Set proper permissions
print_info "Setting permissions..."
ssh -p "$VPS_PORT" "$VPS_USER@$VPS_HOST" "
    find $REMOTE_DIR -type f -exec chmod 644 {} \;
    find $REMOTE_DIR -type d -exec chmod 755 {} \;
"

# Test the deployment
print_info "Testing deployment..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://$VPS_HOST/" || echo "000")

if [ "$HTTP_STATUS" = "200" ]; then
    print_status "Website is accessible!"
    print_info "Visit http://$VPS_HOST to see your site"
else
    print_warning "Website returned HTTP status: $HTTP_STATUS"
    print_warning "This might be normal if you haven't configured DNS/HTTPS yet"
fi

# Show deployment summary
echo ""
echo "======================================"
print_status "Deployment Summary"
echo "======================================"
echo "• Project built: $([ "$SKIP_BUILD" = false ] && echo "Yes" || echo "Skipped")"
echo "• Files deployed to: $VPS_USER@$VPS_HOST:$REMOTE_DIR"
echo "• Deployment method: $([ "$USE_SCP" = false ] && echo "rsync" || echo "scp")"
echo "• Backup created: $([ "$BACKUP" = true ] && echo "Yes" || echo "No")"
echo "• Website URL: http://$VPS_HOST"
echo "======================================"

# Cleanup old backups (keep last 5)
if [ "$BACKUP" = true ]; then
    print_info "Cleaning up old backups (keeping last 5)..."
    ssh -p "$VPS_PORT" "$VPS_USER@$VPS_HOST" '
        cd ~/deployments 2>/dev/null && \
        ls -t | grep "^backup-" | tail -n +6 | xargs -r rm -rf
    ' 2>/dev/null || true
fi

print_status "Deployment complete!"

