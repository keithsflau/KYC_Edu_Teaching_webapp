
$appsDir = "c:\Users\keith\OneDrive\Desktop\Profile\Secondary_School\Biology\apps"
$apps = Get-ChildItem -Path $appsDir -Directory

foreach ($app in $apps) {
    $viteConfigPath = Join-Path $app.FullName "vite.config.js"
    if (Test-Path $viteConfigPath) {
        Write-Host "Updating vite.config.js for $($app.Name)..."
        
        $content = Get-Content -Path $viteConfigPath -Raw
        # Replace existing base setting or add it if missing (simplified regex for the specific format seen)
        if ($content -match "base:\s*['`"].*['`"]") {
            $newContent = $content -replace "base:\s*['`"].*['`"]", "base: './'"
        } else {
            # Insert base: './' into the config object
            $newContent = $content -replace "plugins:\s*\[react\(\)\]", "plugins: [react()],`n  base: './'"
        }
        
        Set-Content -Path $viteConfigPath -Value $newContent
        
        Write-Host "Rebuilding $($app.Name)..."
        Push-Location $app.FullName
        # We need to run npm install if node_modules doesn't exist, but purely running build might fail if dependencies aren't there. 
        # Assuming dependencies are there or we need to install them.
        # To be safe, we'll try to build. If it fails, we might need npm install.
        # Given the previous interactions, node_modules should be there or mostly there? 
        # Actually, let's just run npm run build.
        cmd /c "npm run build"
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Build failed for $($app.Name). Attempting npm install first..."
            cmd /c "npm install && npm run build"
        }
        Pop-Location
    }
}
