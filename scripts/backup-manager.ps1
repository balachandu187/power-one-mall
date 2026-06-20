# Power One Mall Backup Automation Script
# Usage: powershell -ExecutionPolicy Bypass -File scripts/backup-manager.ps1 -Type [daily|weekly|archive]

param (
    [Parameter(Mandatory=$false)]
    [ValidateSet("daily", "weekly", "archive")]
    [string]$Type = "daily"
)

$ErrorActionPreference = "Stop"

# Get absolute path of project root (parent of scripts directory)
$rootPath = Resolve-Path "$PSScriptRoot\.."
$rootPathStr = $rootPath.Path

# Create timestamp string
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$timestampPretty = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Power One Mall Website Backup Automation" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Start Time: $timestampPretty"
Write-Host "Backup Type: $Type"
Write-Host "Project Root: $rootPathStr"
Write-Host "-----------------------------------------"

# Define exclusions
$exclusions = @(
    "node_modules",
    ".next",
    "backups",
    ".git",
    ".vercel",
    "tsconfig.tsbuildinfo",
    "tunnel.log",
    "npm-debug.log",
    "yarn-debug.log",
    "yarn-error.log"
)

# Determine destination path
$backupsBase = Join-Path $rootPathStr "backups"
$destPath = ""
$isArchive = $false

if ($Type -eq "daily") {
    $destPath = Join-Path $backupsBase "daily\backup_daily_$timestamp"
} elseif ($Type -eq "weekly") {
    $destPath = Join-Path $backupsBase "weekly\backup_weekly_$timestamp"
} elseif ($Type -eq "archive") {
    $isArchive = $true
    # For archive, we copy to a temporary directory first, compress, then remove it
    $destPath = Join-Path $backupsBase "temp_archive_$timestamp"
}

# Ensure destination or parent directories exist
if (!(Test-Path $backupsBase)) {
    New-Item -ItemType Directory -Path $backupsBase -Force | Out-Null
}
$parentDest = Split-Path $destPath -Parent
if (!(Test-Path $parentDest)) {
    New-Item -ItemType Directory -Path $parentDest -Force | Out-Null
}

Write-Host "Scanning workspace files (excluding dependencies and builds)..."
# Collect all files to backup, applying exclusions on relative paths
$files = Get-ChildItem -Path $rootPathStr -Recurse -File -Force | Where-Object {
    $relative = $_.FullName.Substring($rootPathStr.Length + 1)
    $isExcluded = $false
    foreach ($ex in $exclusions) {
        if ($relative -eq $ex -or $relative.StartsWith("$ex\") -or $relative.StartsWith("$ex/")) {
            $isExcluded = $true
            break
        }
    }
    !$isExcluded
}

Write-Host "Found $($files.Count) files to back up."

# Create backup directory
New-Item -ItemType Directory -Path $destPath -Force | Out-Null

Write-Host "Copying files to backup destination..."
$copiedCount = 0
foreach ($file in $files) {
    $relative = $file.FullName.Substring($rootPathStr.Length + 1)
    $destFile = Join-Path $destPath $relative
    $destDir = Split-Path $destFile -Parent
    
    if (!(Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }
    
    Copy-Item -Path $file.FullName -Destination $destFile -Force
    $copiedCount++
}

# Collect Git info
$commitHash = "N/A"
$branchName = "N/A"
try {
    $commitHash = (git rev-parse HEAD 2>$null).Trim()
    $branchName = (git branch --show-current 2>$null).Trim()
} catch {
    # Git might not be installed or initialized
}

# Create metadata file
$metadata = [ordered]@{
    "backup_timestamp" = $timestampPretty
    "backup_type"      = $Type
    "git_branch"       = $branchName
    "git_commit"       = $commitHash
    "files_backed_up"  = $copiedCount
    "generator"        = "Power One Mall Automated Backup Manager"
}

$metadataPath = Join-Path $destPath "metadata.json"
$metadata | ConvertTo-Json | Out-File -FilePath $metadataPath -Encoding utf8

# If archive mode, compress and clean up
if ($isArchive) {
    $archivesBase = Join-Path $backupsBase "archives"
    if (!(Test-Path $archivesBase)) {
        New-Item -ItemType Directory -Path $archivesBase -Force | Out-Null
    }
    $zipPath = Join-Path $archivesBase "archive_$timestamp.zip"
    
    Write-Host "Compressing backup into ZIP archive: $zipPath..."
    # Zip the contents of the temp folder
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::CreateFromDirectory($destPath, $zipPath)
    
    Write-Host "Cleaning up temporary files..."
    Remove-Item -Path $destPath -Recurse -Force
    
    $finalOutput = $zipPath
} else {
    $finalOutput = $destPath
}

Write-Host "-----------------------------------------"
Write-Host "Backup completed successfully!" -ForegroundColor Green
Write-Host "Destination: $finalOutput" -ForegroundColor Green
Write-Host "Metadata created in backup directory."
Write-Host "========================================="
