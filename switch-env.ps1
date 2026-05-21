# Switch between environment configurations
param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("local", "friend")]
    [string]$Environment
)

$sourceFile = ".env.$Environment"
$targetFile = ".env.local"

if (Test-Path $sourceFile) {
    Copy-Item $sourceFile $targetFile -Force
    Write-Host "✅ Switched to $Environment environment!" -ForegroundColor Green
    Write-Host "Please restart your dev server for changes to take effect." -ForegroundColor Yellow
} else {
    Write-Host "❌ Error: $sourceFile not found!" -ForegroundColor Red
}
