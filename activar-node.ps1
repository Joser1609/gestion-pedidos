# Agrega Node.js al PATH de esta sesion de PowerShell
$nodePath = "C:\Program Files\nodejs"
if ($env:Path -notlike "*$nodePath*") {
  $env:Path = "$nodePath;$env:Path"
}
Write-Host "Node.js activado: $(node -v) | npm: $(npm -v)"
