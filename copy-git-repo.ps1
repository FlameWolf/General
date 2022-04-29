$src = "C:\Users\<Username>\source\repos\Express\repo-source";
$dest = "C:\Users\<Username>\source\repos\Heroku\repo-destination";
$exclude =
	"C:\Users\<Username>\source\repos\Express\repo-source\.git",
	"C:\Users\<Username>\source\repos\Express\repo-source\.vscode",
	"C:\Users\<Username>\source\repos\Express\repo-source\node_modules",
	"C:\Users\<Username>\source\repos\Express\repo-source\.env",
	"C:\Users\<Username>\source\repos\Express\repo-source\google-credentials.json";
Clear-Host;
Get-ChildItem -LiteralPath $src | Where-Object { $exclude -notcontains $_.FullName } | Copy-Item -Destination $dest -Force -Recurse;
Write-Host "Done";
