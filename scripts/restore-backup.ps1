# Power One Mall Backup Restore Automation Script
# Usage: powershell -ExecutionPolicy Bypass -File scripts/restore-backup.ps1 [-BackupPath <path>] [-Latest]

param (
    [Parameter(Mandatory=$false)]
    [string]$BackupPath = "",

    [Parameter(Mandatory=$false)]
    [switch]$Latest
)

$ErrorActionPreference = "Stop"

# Get absolute path of project root (parent of scripts directory)
$rootPath = Resolve-Path "$PSScriptRoot\.."
$rootPathStr = $rootPath.Path
$backupsBase = Join-Path $rootPathStr "backups"

Write-Host "=========================================" -ForegroundColor Yellow
Write-Host "Power One Mall Website Restore Utility" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Yellow

# 1. Discover Backups if BackupPath not provided
if ([string]::IsNullOrEmpty($BackupPath)) {
    if (!(Test-Path $backupsBase)) {
        Write-Error "No backups directory found at $backupsBase. Cannot restore."
    }

    # Find daily, weekly folders and archive zips
    $availableBackups = @()
    
    # Scan daily backups
    if (Test-Path (Join-Path $backupsBase "daily")) {
        $dailyDirs = Get-ChildItem -Path (Join-Path $backupsBase "daily") -Directory -Filter "backup_daily_*"
        foreach ($d in $dailyDirs) {
            $availableBackups += [pscustomobject]@{
                Name = $d.Name
                Path = $d.FullName
                Type = "Daily Folder"
                Date = $d.LastWriteTime
            }
        }
    }
    
    # Scan weekly backups
    if (Test-Path (Join-Path $backupsBase "weekly")) {
        $weeklyDirs = Get-ChildItem -Path (Join-Path $backupsBase "weekly") -Directory -Filter "backup_weekly_*"
        foreach ($w in $weeklyDirs) {
            $availableBackups += [pscustomobject]@{
                Name = $w.Name
                Path = $w.FullName
                Type = "Weekly Folder"
                Date = $w.LastWriteTime
            }
        }
    }

    # Scan archives
    if (Test-Path (Join-Path $backupsBase "archives")) {
        $zips = Get-ChildItem -Path (Join-Path $backupsBase "archives") -File -Filter "archive_*.zip"
        foreach ($z in $zips) {
            $availableBackups += [pscustomobject]@{
                Name = $z.Name
                Path = $z.FullName
                Type = "ZIP Archive"
                Date = $z.LastWriteTime
            }
        }
    }

    if ($availableBackups.Count -eq 0) {
        Write-Error "No backup folders or archives found in $backupsBase."
    }

    # Sort by Date Descending
    $availableBackups = $availableBackups | Sort-Object Date -Descending

    if ($Latest) {
        $selected = $availableBackups[0]
        Write-Host "Automatically selected latest backup: $($selected.Name) ($($selected.Type))"
        $BackupPath = $selected.Path
    } else {
        # Interactive selection
        Write-Host "Available Backups (Latest First):"
        for ($i = 0; $i -lt $availableBackups.Count; $i++) {
            $b = $availableBackups[$i]
            Write-Host " [$i] $($b.Name) ($($b.Type)) - $($b.Date)"
        }
        Write-Host ""
        
        $selection = -1
        while ($selection -lt 0 -or $selection -ge $availableBackups.Count) {
            $input = Read-Host "Select backup index to restore (0 to $($availableBackups.Count - 1))"
            if ([int]::TryParse($input, [ref]$selection)) {
                if ($selection -lt 0 -or $selection -ge $availableBackups.Count) {
                    Write-Host "Invalid index. Try again." -ForegroundColor Red
                }
            } else {
                $selection = -1
                Write-Host "Invalid number. Try again." -ForegroundColor Red
            }
        }
        
        $selected = $availableBackups[$selection]
        Write-Host "Selected backup: $($selected.Name) ($($selected.Type))"
        $BackupPath = $selected.Path
    }
}

# Ensure backup path exists
if (!(Test-Path $BackupPath)) {
    Write-Error "Specified backup path does not exist: $BackupPath"
}

Write-Host "-----------------------------------------"
Write-Host "WARNING: Restoring will overwrite current files in the workspace!" -ForegroundColor Red
Write-Host "A safety snapshot of your current workspace will be created first." -ForegroundColor Cyan
Write-Host "-----------------------------------------"

if (!$Latest) {
    $confirm = Read-Host "Are you sure you want to proceed with the restoration? (y/N)"
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-Host "Restoration cancelled by user."
        exit
    }
}

# 2. Safety Snapshot
$safetyTimestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$safetyPath = Join-Path $backupsBase "safety_pre_restore_$safetyTimestamp"
Write-Host "Creating safety snapshot at: $safetyPath..."

# Define exclusions for current workspace copy
$exclusions = @(
    "node_modules",
    ".next",
    "backups",
    ".git",
    ".vercel",
    "tsconfig.tsbuildinfo",
    "tunnel.log"
)

$currentFiles = Get-ChildItem -Path $rootPathStr -Recurse -File -Force | Where-Object {
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

New-Item -ItemType Directory -Path $safetyPath -Force | Out-Null
foreach ($file in $currentFiles) {
    $relative = $file.FullName.Substring($rootPathStr.Length + 1)
    $destFile = Join-Path $safetyPath $relative
    $destDir = Split-Path $destFile -Parent
    if (!(Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }
    Copy-Item -Path $file.FullName -Destination $destFile -Force
}
Write-Host "Safety snapshot complete."

# 3. Clean Workspace (keep git, node_modules, .next, backups)
Write-Host "Cleaning current workspace files (retaining dependencies and git history)..."
$filesToDelete = Get-ChildItem -Path $rootPathStr -File -Force | Where-Object {
    $name = $_.Name
    $name -ne "package-lock.json" -and $name -ne "tunnel.log" # keep lockfile for fast install
}
$dirsToDelete = Get-ChildItem -Path $rootPathStr -Directory -Force | Where-Object {
    $name = $_.Name
    $name -ne "node_modules" -and $name -ne ".git" -and $name -ne ".next" -and $name -ne "backups" -and $name -ne "scripts"
}

foreach ($f in $filesToDelete) {
    Remove-Item -Path $f.FullName -Force
}
foreach ($d in $dirsToDelete) {
    Remove-Item -Path $d.FullName -Recurse -Force
}
Write-Host "Workspace cleaned."

# 4. Copy Backup Files to Workspace
Write-Host "Restoring backup files to workspace root..."
if ($BackupPath.EndsWith(".zip")) {
    Write-Host "Extracting ZIP archive: $BackupPath..."
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($BackupPath, $rootPathStr)
} else {
    Write-Host "Copying directory backup files..."
    $backupFiles = Get-ChildItem -Path $BackupPath -Recurse -File -Force | Where-Object {
        $_.Name -ne "metadata.json" # Exclude metadata file
    }
    foreach ($file in $backupFiles) {
        $relative = $file.FullName.Substring($BackupPath.Length + 1)
        $destFile = Join-Path $rootPathStr $relative
        $destDir = Split-Path $destFile -Parent
        if (!(Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }
        Copy-Item -Path $file.FullName -Destination $destFile -Force
    }
}

# 5. Validation Check
Write-Host "Running post-restore validation..."
$criticalFiles = @("package.json", "src/app/layout.tsx", "src/app/page.tsx")
$isValid = $true
foreach ($cf in $criticalFiles) {
    $path = Join-Path $rootPathStr $cf
    if (!(Test-Path $path)) {
        Write-Host "Validation Failed: Critical file $cf is missing!" -ForegroundColor Red
        $isValid = $false
    }
}

if ($isValid) {
    Write-Host "-----------------------------------------"
    Write-Host "Restoration completed successfully!" -ForegroundColor Green
    Write-Host "Active files replaced with chosen backup." -ForegroundColor Green
    Write-Host "Safety backup retained at: $safetyPath" -ForegroundColor Cyan
    Write-Host "========================================="
} else {
    Write-Host "-----------------------------------------"
    Write-Host "RESTORATION ERROR: The restored workspace seems incomplete." -ForegroundColor Red
    Write-Host "You can manually rollback by copying files from the safety snapshot:" -ForegroundColor Yellow
    Write-Host "$safetyPath" -ForegroundColor Yellow
    Write-Host "========================================="
    exit 1
}
