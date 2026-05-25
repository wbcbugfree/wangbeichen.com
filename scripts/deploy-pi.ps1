param(
  [string]$RemoteHost = "chinawave@192.168.1.242",
  [string]$KeyPath = "$env:USERPROFILE\.ssh\wangbeichen_pi_ed25519",
  [string]$RemoteRoot = "/home/chinawave/wangbeichen.com"
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$outDir = Join-Path $repoRoot "out"
$release = Get-Date -Format "yyyyMMdd-HHmmss"
$remoteRelease = "$RemoteRoot/releases/$release"

Write-Host "Building static site..."
npm run build

Write-Host "Creating remote release $remoteRelease..."
ssh -i $KeyPath -o BatchMode=yes $RemoteHost "mkdir -p $remoteRelease"

Write-Host "Copying static files to Raspberry Pi..."
$outGlob = Join-Path $outDir "*"
scp -r -i $KeyPath -o BatchMode=yes $outGlob "${RemoteHost}:$remoteRelease/"

Write-Host "Preparing clean URLs and updating current symlink..."
$postDeploy = @"
from pathlib import Path
root = Path("$remoteRelease")
for html in root.rglob("*.html"):
    if html.name == "index.html":
        continue
    target = html.with_suffix("")
    target.mkdir(parents=True, exist_ok=True)
    (target / "index.html").write_bytes(html.read_bytes())
current = Path("$RemoteRoot/current")
if current.exists() or current.is_symlink():
    current.unlink()
current.symlink_to(root, target_is_directory=True)
print(current.resolve())
"@
$postDeploy | ssh -i $KeyPath -o BatchMode=yes $RemoteHost "python3 -"

Write-Host "Ensuring Pi services are active..."
ssh -i $KeyPath -o BatchMode=yes $RemoteHost "sudo systemctl restart wangbeichen-site.service && sudo systemctl start wangbeichen-cloudflared.service && systemctl is-active --quiet wangbeichen-site.service && systemctl is-active --quiet wangbeichen-cloudflared.service"

Write-Host "Verifying local Pi service..."
ssh -i $KeyPath -o BatchMode=yes $RemoteHost "curl -fsSI --max-time 10 http://127.0.0.1:8081/ >/dev/null && curl -fsSI --max-time 10 http://127.0.0.1:8081/cv.pdf >/dev/null"

Write-Host "Verifying public Cloudflare URL..."
ssh -i $KeyPath -o BatchMode=yes $RemoteHost "curl -fsSI --max-time 20 https://wangbeichen.com/ >/dev/null && curl -fsSI --max-time 20 https://wangbeichen.com/cv.pdf >/dev/null"

Write-Host "Deployed $release to https://wangbeichen.com"
