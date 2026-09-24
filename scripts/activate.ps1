$replicaRoot = Split-Path -Parent $PSScriptRoot
$toolPaths = @('node_modules/.bin', '.tools/python/Scripts', '.tools/livekit', '.tools/stripe', '.tools/gitleaks') | ForEach-Object { Join-Path $replicaRoot $_ }
$env:PATH = ($toolPaths -join ';') + ';' + $env:PATH
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path $replicaRoot '.tools/browsers'
$env:UV_CACHE_DIR = Join-Path $replicaRoot '.tools/uv-cache'
Write-Output 'Entorno de Replica activado solo para esta terminal.'
