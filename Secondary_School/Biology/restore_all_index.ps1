
$appsDir = "c:\Users\keith\OneDrive\Desktop\Profile\Secondary_School\Biology\apps"
$apps = Get-ChildItem -Path $appsDir -Directory

$template = @"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>APP_NAME</title>
</head>
  <body>
    <div id="root"></div>
    
<script type="module" src="/src/ENTRY_FILE"></script>
  </body>
</html>
"@

foreach ($app in $apps) {
    $indexVal = Join-Path $app.FullName "index.html"
    $mainJsx = Join-Path $app.FullName "src\main.jsx"
    $mainTsx = Join-Path $app.FullName "src\main.tsx"
    
    $entryFile = ""
    if (Test-Path $mainJsx) { $entryFile = "main.jsx" }
    elseif (Test-Path $mainTsx) { $entryFile = "main.tsx" }
    
    if ($entryFile -ne "") {
        Write-Host "Restoring index.html for $($app.Name) with entry $entryFile..."
        $content = $template.Replace("APP_NAME", $app.Name).Replace("ENTRY_FILE", $entryFile)
        Set-Content -Path $indexVal -Value $content
    }
    else {
        Write-Host "Skipping $($app.Name): No src/main.jsx or src/main.tsx found."
    }
}
