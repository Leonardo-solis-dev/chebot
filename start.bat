@echo off
color d

echo Starting Bot @%TIME% On %DATE%..
:main
node index.js
echo Died @%TIME% 
echo Restarting Bot..
goto main
