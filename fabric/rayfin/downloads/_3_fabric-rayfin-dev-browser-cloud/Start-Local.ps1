# Works from any current directory; configuration lives beside this script.
[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'

function New-DatabasePassword {
    $randomBytes = New-Object byte[] 32
    $generator = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try { $generator.GetBytes($randomBytes) } finally { $generator.Dispose() }
    return 'Rf1!' + [Convert]::ToBase64String($randomBytes)
}

$envFile = Join-Path $PSScriptRoot '.env'
$existingText = if (Test-Path -LiteralPath $envFile) { Get-Content -LiteralPath $envFile -Raw } else { '' }
$newLines = @()
foreach ($variableName in @('RAYFIN_DB_PASSWORD', 'RAYFIN_SQL_PASSWORD')) {
    if ($existingText -notmatch ('(?m)^' + $variableName + '=.+$')) {
        $newLines += $variableName + '=' + (New-DatabasePassword)
    }
}
if ($newLines.Count -gt 0) {
    Add-Content -LiteralPath $envFile -Value ([Environment]::NewLine + ($newLines -join [Environment]::NewLine)) -Encoding utf8
}
if (-not $env:PASSWORD) {
    $secret = Read-Host 'Choose the browser editor password' -AsSecureString
    $env:PASSWORD = [System.Net.NetworkCredential]::new('', $secret).Password
}
if ([string]::IsNullOrWhiteSpace($env:PASSWORD)) { throw 'The editor password must not be empty.' }

$composeFile = Join-Path $PSScriptRoot 'compose.yaml'
docker compose --env-file $envFile -f $composeFile up --build -d
if ($LASTEXITCODE -ne 0) { throw 'Startup failed. Run docker compose logs from the project folder for details.' }
Write-Host 'Editor: http://localhost:8080'
Write-Host 'Sample app: http://localhost:3000'
Write-Host 'Local Rayfin backend: http://localhost:5168'
