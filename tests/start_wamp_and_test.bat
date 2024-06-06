@echo off
start "" "C:\wamp64\wampmanager.exe"  
timeout /t 15

start "" "node ..\search.js"  
timeout /t 10

npm run test

taskkill /IM wampmanager.exe /F  REM Uncomment to stop WAMP after tests
taskkill /IM node.exe /F  REM Uncomment to stop your app after tests