@echo off
title SDK Zile - Install Trusted HTTPS Certificate
cd /d "%~dp0"

echo ===================================================================
echo   SDK Zile - Local HTTPS Certificate Trust Installer
echo ===================================================================
echo.
echo Windows will now ask you to confirm installing the local CA certificate.
echo Please click "YES" on the Windows Security Warning dialog.
echo.
echo This allows Chrome, Edge, and your system to trust https://localhost
echo and https://10.90.0.50 without any "Not secure" red warnings!
echo.
echo -------------------------------------------------------------------
echo.

ssl\mkcert.exe -install

echo.
echo ===================================================================
echo   Installation completed successfully!
echo   You can now close this window and refresh your browser.
echo ===================================================================
echo.
pause
