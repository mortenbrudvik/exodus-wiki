#Requires -Version 5.1
<#
.SYNOPSIS
  Serve the Book Wikis site locally and open it in the default browser.

.DESCRIPTION
  Starts a static HTTP server from the repository root (preferred over file://
  so search and relative assets work), then opens the hub in your browser.

.PARAMETER Port
  TCP port for the local server. Default: 8080.

.PARAMETER Path
  URL path to open after the server starts (relative to site root).
  Examples: "/" (hub), "/exodus-the-archimedes-engine/", "/exodus-the-archimedes-engine/pages/factions/uranics.html"

.PARAMETER NoBrowser
  Start the server only; do not open a browser.

.EXAMPLE
  .\serve.ps1
  Serve on port 8080 and open the hub.

.EXAMPLE
  .\serve.ps1 -Port 3000 -Path /exodus-the-archimedes-engine/
  Serve on 3000 and open the Exodus wiki.

.EXAMPLE
  .\serve.ps1 -NoBrowser
  Server only (useful if the browser is already open).
#>
[CmdletBinding()]
param(
    [int] $Port = 8080,
    [string] $Path = "/",
    [switch] $NoBrowser
)

$ErrorActionPreference = "Stop"

$Root = $PSScriptRoot
if (-not $Root) {
    $Root = Get-Location
}

function Test-CommandAvailable {
    param([string] $Name)
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Find-Python {
    foreach ($candidate in @("python", "py", "python3")) {
        if (Test-CommandAvailable $candidate) {
            return $candidate
        }
    }
    return $null
}

function Test-PortInUse {
    param([int] $PortNumber)
    try {
        $listener = [System.Net.Sockets.TcpListener]::new(
            [System.Net.IPAddress]::Loopback,
            $PortNumber
        )
        $listener.Start()
        $listener.Stop()
        return $false
    }
    catch {
        return $true
    }
}

# Normalize path for URL
if (-not $Path.StartsWith("/")) {
    $Path = "/" + $Path
}
$Url = "http://localhost:$Port$Path"

$python = Find-Python
if (-not $python) {
    Write-Error "Python was not found on PATH. Install Python or add it to PATH, then retry."
}

if (Test-PortInUse -PortNumber $Port) {
    Write-Host "Port $Port is already in use." -ForegroundColor Yellow
    Write-Host "Opening existing server at $Url" -ForegroundColor Cyan
    if (-not $NoBrowser) {
        Start-Process $Url
    }
    return
}

Write-Host "Serving Book Wikis from:" -ForegroundColor Cyan
Write-Host "  $Root"
Write-Host "URL:" -ForegroundColor Cyan
Write-Host "  $Url"
Write-Host ""
Write-Host "Press Ctrl+C to stop the server." -ForegroundColor DarkGray
Write-Host ""

Push-Location $Root
try {
    # Open browser shortly after the server process starts
    if (-not $NoBrowser) {
        $openJob = Start-Job -ScriptBlock {
            param($TargetUrl)
            Start-Sleep -Milliseconds 600
            Start-Process $TargetUrl
        } -ArgumentList $Url
    }

    # python -m http.server binds to all interfaces; fine for local preview
    & $python -m http.server $Port
}
finally {
    if ($openJob) {
        Remove-Job -Job $openJob -Force -ErrorAction SilentlyContinue
    }
    Pop-Location
}
