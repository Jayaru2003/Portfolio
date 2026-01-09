@echo off
echo.
echo ========================================
echo   Starting Serverless Portfolio
echo ========================================
echo.
echo Opening your portfolio in the browser...
echo Press Ctrl+C to stop the server
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python to start server...
    start http://localhost:8000
    python -m http.server 8000
) else (
    echo Python not found. Opening index.html directly...
    echo.
    echo Note: For best results, use a local server
    echo You can install:
    echo   - Python: https://www.python.org/downloads/
    echo   - Or use VS Code Live Server extension
    echo.
    start index.html
    pause
)
