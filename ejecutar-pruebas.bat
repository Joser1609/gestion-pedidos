@echo off
title Pruebas - Gestion de Pedidos
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"
echo.
echo Ejecutando pruebas unitarias...
echo.
npm test
echo.
pause
