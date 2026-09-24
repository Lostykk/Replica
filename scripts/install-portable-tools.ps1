$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$replicaRoot = Split-Path -Parent $PSScriptRoot
$targets = @(
  @{ Repo = 'livekit/livekit-cli'; Pattern = '*windows_amd64.zip'; Folder = 'livekit' },
  @{ Repo = 'stripe/stripe-cli'; Pattern = '*windows_x86_64.zip'; Folder = 'stripe' },
  @{ Repo = 'gitleaks/gitleaks'; Pattern = '*windows_x64.zip'; Folder = 'gitleaks' }
)
$records = @()
foreach ($target in $targets) {
  $release = Invoke-RestMethod -Uri ('https://api.github.com/repos/' + $target.Repo + '/releases/latest')
  $asset = @($release.assets | Where-Object { $_.name -like $target.Pattern })
  if ($asset.Count -ne 1) { throw ('Expected one official asset for ' + $target.Repo) }
  $asset = $asset[0]
  if ($asset.digest -notmatch '^sha256:[a-f0-9]{64}$') { throw 'Official SHA256 digest missing' }
  $destination = Join-Path $replicaRoot ('.tools/' + $target.Folder)
  New-Item -ItemType Directory -Path $destination -Force | Out-Null
  $archive = Join-Path $replicaRoot ('work/' + $asset.name)
  & curl.exe --fail --location --silent --show-error --retry 2 --max-time 120 $asset.browser_download_url --output $archive
  if ($LASTEXITCODE -ne 0) { throw ('Download failed: ' + $asset.name) }
  $hash = (Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash.ToLowerInvariant()
  if (('sha256:' + $hash) -ne $asset.digest) { throw ('Checksum mismatch for ' + $asset.name) }
  Expand-Archive -LiteralPath $archive -DestinationPath $destination -Force
  $records += @{ tool = $target.Folder; version = $release.tag_name; url = $asset.browser_download_url; sha256 = $hash }
  Write-Output ($target.Folder + ' ' + $release.tag_name + ': installed and SHA256 verified')
}
$records | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $replicaRoot 'docs/evidence/fase-0/portable-tools.json') -Encoding UTF8
