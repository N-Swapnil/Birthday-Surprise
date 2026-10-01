@echo off
setlocal enabledelayedexpansion
cd /d "C:\Swapnil\Birthday-Surprise\assets\Photos1"

set counter=1

for %%A in (*.jpg *.jpeg *.png *.bmp *.gif) do (
    ren "%%A" "photo!counter!%%~xA"
    set /a counter+=1
)

echo.
echo Renaming complete! Files renamed to photo1.jpg, photo2.jpg, etc.
pause