# Power One Mall Git Rollback Automation Script
# Usage: powershell -ExecutionPolicy Bypass -File scripts/rollback-git.ps1 -Target [v1.0|v1.1|v1.2|v2.0|<commit-hash>]

param (
    [Parameter(Mandatory=$true)]
    [string]$Target
)

$ErrorActionPreference = "Stop"

# Get absolute path of project root
$rootPath = Resolve-Path "$PSScriptRoot\.."
$rootPathStr = $rootPath.Path

Write-Host "=========================================" -ForegroundColor Magenta
Write-Host "Power One Mall Git Rollback Utility" -ForegroundColor Magenta
Write-Host "=========================================" -ForegroundColor Magenta

# Check Git installation
try {
    $currentCommit = (git rev-parse HEAD 2>$null).Trim()
    $currentBranch = (git branch --show-current 2>$null).Trim()
} catch {
    Write-Error "Git is not installed or the project is not a Git repository."
}

# Resolve target tag or commit
$targetCommit = ""
try {
    $targetCommit = (git rev-parse $Target 2>$null).Trim()
} catch {
    Write-Host "Target '$Target' could not be resolved to a Git tag or commit hash." -ForegroundColor Red
    exit 1
}

Write-Host "Current Branch: $currentBranch"
Write-Host "Current Commit: $currentCommit"
Write-Host "Target:         $Target ($targetCommit)"
Write-Host "-----------------------------------------"
Write-Host "WARNING: This will perform a HARD reset." -ForegroundColor Red
Write-Host "All uncommitted changes in your workspace will be DISCARDED." -ForegroundColor Red
Write-Host "A backup branch of your current commit will be created automatically." -ForegroundColor Cyan
Write-Host "-----------------------------------------"

$confirm = Read-Host "Are you sure you want to rollback to '$Target'? (y/N)"
if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "Rollback cancelled by user."
    exit
}

# 1. Create a safety snapshot branch of current HEAD
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$safetyBranch = "safety_pre_rollback_$timestamp"
Write-Host "Creating safety backup branch '$safetyBranch' at current commit..."
try {
    # Stash any dirty uncommitted changes first to avoid losing them
    $stashResult = (git stash 2>&1).ToString()
    $stashed = $stashResult -notmatch "No local changes to save"
    
    # Create the safety branch from current HEAD
    git branch $safetyBranch | Out-Null
    Write-Host "Safety branch created successfully."
} catch {
    Write-Host "Failed to create safety branch. Aborting rollback." -ForegroundColor Red
    exit 1
}

# 2. Perform Rollback
Write-Host "Resetting workspace to '$Target'..."
try {
    git reset --hard $targetCommit | Out-Null
    Write-Host "Workspace hard reset completed." -ForegroundColor Green
} catch {
    Write-Host "Failed to reset workspace." -ForegroundColor Red
    if ($stashed) {
        Write-Host "Attempting to restore stashed changes..."
        git stash pop | Out-Null
    }
    exit 1
}

# 3. Clean up untracked files (optional - we can keep node_modules and backups)
Write-Host "Cleaning up build cache and untracked files..."
try {
    # clean untracked files except node_modules and backups
    git clean -fd -e "node_modules/" -e "backups/" | Out-Null
} catch {
    Write-Host "Warning: Failed to clean untracked files." -ForegroundColor Yellow
}

# 4. Success Output
Write-Host "-----------------------------------------"
Write-Host "Rollback successful!" -ForegroundColor Green
Write-Host "Workspace is now at commit: $(git rev-parse --short HEAD) - $(git log -1 --pretty=format:'%s')" -ForegroundColor Green
Write-Host "If you need to revert this rollback, switch back to safety branch:" -ForegroundColor Cyan
Write-Host "  git checkout $safetyBranch" -ForegroundColor Cyan
Write-Host "========================================="
