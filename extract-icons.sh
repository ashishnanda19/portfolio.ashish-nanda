#!/bin/bash

# Script to extract macOS app icons and save them as PNG files
# Run this script on macOS to extract the original app icons

ICONS_DIR="public/icons"
mkdir -p "$ICONS_DIR"

# Function to extract icon from an app
extract_icon() {
    local app_name=$1
    local output_name=$2
    local app_path="/System/Applications/${app_name}.app"
    local icns_name="${app_name}.icns"
    
    # Check system applications first, then regular applications
    if [ ! -d "$app_path" ]; then
        app_path="/Applications/${app_name}.app"
    fi
    
    if [ -d "$app_path" ]; then
        # Try multiple possible icon file names
        local icns_file=""
        
        # Try specific icon names
        for icon_name in "${app_name}.icns" "AppIcon.icns" "app.icns" "${app_name}Template.icns"; do
            if [ -f "${app_path}/Contents/Resources/${icon_name}" ]; then
                icns_file="${app_path}/Contents/Resources/${icon_name}"
                break
            fi
        done
        
        # If not found, search for any .icns file
        if [ -z "$icns_file" ]; then
            icns_file=$(find "${app_path}/Contents/Resources" -name "*.icns" 2>/dev/null | head -1)
        fi
        
        if [ -n "$icns_file" ] && [ -f "$icns_file" ]; then
            # Extract the largest icon size (512x512)
            sips -z 512 512 -s format png "$icns_file" --out "${ICONS_DIR}/${output_name}.png" > /dev/null 2>&1
            if [ -f "${ICONS_DIR}/${output_name}.png" ]; then
                echo "✓ Extracted ${app_name} icon → ${output_name}.png"
                return 0
            fi
        fi
        echo "✗ Failed to extract ${app_name} icon (no .icns file found)"
    else
        echo "✗ ${app_name} not found at ${app_path}"
    fi
    return 1
}

# Extract macOS system app icons
echo "Extracting macOS app icons..."

# Finder (system app)
if [ -d "/System/Library/CoreServices/Finder.app" ]; then
    finder_icns=$(find "/System/Library/CoreServices/Finder.app/Contents/Resources" -name "*.icns" 2>/dev/null | head -1)
    if [ -n "$finder_icns" ]; then
        sips -z 512 512 -s format png "$finder_icns" --out "${ICONS_DIR}/finder.png" > /dev/null 2>&1
        echo "✓ Extracted Finder icon → finder.png"
    fi
fi

# Safari
extract_icon "Safari" "safari"

# Terminal (system app - check both locations)
if [ -d "/System/Applications/Utilities/Terminal.app" ]; then
    terminal_icns=$(find "/System/Applications/Utilities/Terminal.app/Contents/Resources" -name "*.icns" 2>/dev/null | head -1)
    if [ -n "$terminal_icns" ]; then
        sips -z 512 512 -s format png "$terminal_icns" --out "${ICONS_DIR}/terminal.png" > /dev/null 2>&1
        echo "✓ Extracted Terminal icon → terminal.png"
    fi
elif [ -d "/Applications/Utilities/Terminal.app" ]; then
    extract_icon "Terminal" "terminal"
fi

# Photo Booth
extract_icon "Photo Booth" "photobooth"

# VS Code (third-party app - check common locations)
for vscode_path in "/Applications/Visual Studio Code.app" "/Applications/Code.app"; do
    if [ -d "$vscode_path" ]; then
        vscode_icns=$(find "${vscode_path}/Contents/Resources" -name "*.icns" 2>/dev/null | head -1)
        if [ -n "$vscode_icns" ]; then
            sips -z 512 512 -s format png "$vscode_icns" --out "${ICONS_DIR}/vscode.png" > /dev/null 2>&1
            echo "✓ Extracted VS Code icon → vscode.png"
            break
        fi
    fi
done

# Game Center (Arcade)
extract_icon "Game Center" "game-center"

echo ""
echo "Done! Icons extracted to ${ICONS_DIR}/"
echo "If any icons are missing, you may need to extract them manually or download them from a trusted source."

