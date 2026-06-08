$nodePath = "C:\Program Files\nodejs"
if ($env:Path -notlike "*$nodePath*") {
  $env:Path = "$nodePath;$env:Path"
}
Write-Host "Node.js activo: $(node -v) | npm: $(npm -v)" -ForegroundColor Green
