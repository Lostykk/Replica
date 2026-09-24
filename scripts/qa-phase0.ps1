$ErrorActionPreference = 'Stop'
$replicaRoot = Split-Path -Parent $PSScriptRoot
Push-Location $replicaRoot
try {
  . ./scripts/activate.ps1
  $checks = @('qa:phase0', 'typecheck', 'lint', 'test')
  $results = @()
  foreach ($check in $checks) {
    $started = (Get-Date).ToUniversalTime().ToString('o')
    $log = Join-Path $replicaRoot ('docs/evidence/fase-0/' + $check.Replace(':', '-') + '.txt')
    $ErrorActionPreference = 'Continue'
    & pnpm.cmd run $check *> $log
    $code = $LASTEXITCODE
    $ErrorActionPreference = 'Stop'
    $results += @{ command = 'pnpm run ' + $check; exitCode = $code; startedAt = $started }
    Write-Output ($check + ': exit ' + $code)
    if ($code -ne 0) {
      Get-Content -LiteralPath $log
      throw ('QA failed: ' + $check)
    }
  }
  $results | ConvertTo-Json -Depth 3 | Set-Content -LiteralPath docs/evidence/fase-0/checks.json -Encoding UTF8
} finally {
  Pop-Location
}
