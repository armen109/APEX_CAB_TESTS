# PowerShell script to run Rider App tests
# Alternative to Makefile for Windows users without Make installed

param(
    [Parameter(Position=0)]
    [string]$Command = "help"
)

# Configuration
$TEST_RUNNER = "maestro test"
$TEST_DIR = "flows"
$REGRESSION_DIR = "regression"
$REPORT_DIR = "reports"
$TIMESTAMP = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$REPORT_FILE = "$REPORT_DIR\test-report-$TIMESTAMP.txt"
$SUMMARY_FILE = "$REPORT_DIR\test-summary-$TIMESTAMP.txt"
$STOP_FLAG = ".stop_regression"

# Colors (for PowerShell)
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

# Create reports directory if it doesn't exist
if (-not (Test-Path $REPORT_DIR)) {
    New-Item -ItemType Directory -Path $REPORT_DIR | Out-Null
}

# Load environment variables from .env file if it exists
if (Test-Path ".env") {
    Get-Content .env | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
    Write-ColorOutput Green "Loaded environment variables from .env file"
}

function Show-Help {
    Write-ColorOutput Yellow "Available commands:"
    Write-Output ""
    Write-Output "  .\run.ps1 help              - Show this help message"
    Write-Output "  .\run.ps1 all               - Run all test suites"
    Write-Output "  .\run.ps1 regression        - Run regression tests (with reporting)"
    Write-Output "  .\run.ps1 report            - Generate report from last run"
    Write-Output "  .\run.ps1 clean             - Clean report files"
    Write-Output "  .\run.ps1 stop              - Stop running regression tests"
    Write-Output ""
    Write-ColorOutput Yellow "Test Suites:"
    Write-Output "  .\run.ps1 login             - Run all Login tests"
    Write-Output "  .\run.ps1 register          - Run all Registration tests"
    Write-Output "  .\run.ps1 profile          - Run all Profile tests"
    Write-Output "  .\run.ps1 settings          - Run all Settings tests"
    Write-Output "  .\run.ps1 activity          - Run Activity tests"
    Write-Output "  .\run.ps1 logout            - Run Logout test"
    Write-Output ""
    Write-ColorOutput Yellow "Individual Test Categories:"
    Write-Output "  .\run.ps1 login-valid       - Run valid login tests"
    Write-Output "  .\run.ps1 login-invalid     - Run invalid login tests"
    Write-Output "  .\run.ps1 profile-email     - Run profile email tests"
    Write-Output "  .\run.ps1 profile-name      - Run profile name tests"
    Write-Output "  .\run.ps1 profile-phone      - Run profile phone tests"
    Write-Output "  .\run.ps1 profile-photo      - Run profile photo tests"
    Write-Output "  .\run.ps1 settings-addresses - Run MyAddresses tests"
    Write-Output "  .\run.ps1 settings-language - Run Language change tests"
    Write-Output "  .\run.ps1 settings-theme     - Run Theme change tests"
}

function Run-Regression {
    Write-ColorOutput Green "========================================"
    Write-ColorOutput Green "Running Regression Test Suite"
    Write-ColorOutput Green "========================================"
    Write-ColorOutput Blue "Report will be saved to: $REPORT_FILE"
    Write-Output ""
    Write-ColorOutput Yellow "Note: Tests will continue running even if some fail."
    Write-ColorOutput Yellow "A summary report will be generated at the end."
    Write-ColorOutput Yellow "To stop: Press Ctrl+C or run '.\run.ps1 stop' in another terminal"
    Write-Output ""
    
    # Remove stop flag if it exists
    if (Test-Path $STOP_FLAG) {
        Remove-Item $STOP_FLAG -Force
    }
    
    # Run regression tests
    Run-RegressionTests | Tee-Object -FilePath $REPORT_FILE
    
    # Generate summary if not stopped
    if (-not (Test-Path $STOP_FLAG)) {
        Generate-Summary
        Get-Content $REPORT_FILE
    } else {
        Remove-Item $STOP_FLAG -Force
        Write-ColorOutput Yellow "Regression stopped by user request."
    }
    
    Write-Output ""
    Write-ColorOutput Green "========================================"
    Write-ColorOutput Green "Regression tests completed!"
    Write-ColorOutput Green "Full report: $REPORT_FILE"
    Write-ColorOutput Green "Summary: $SUMMARY_FILE"
    Write-ColorOutput Green "========================================"
}

function Run-TestCommand {
    param([string]$TestPath)
    $cmd = $TEST_RUNNER -split ' '
    & $cmd[0] $cmd[1] $TestPath
}

function Run-RegressionTests {
    if (Test-Path $STOP_FLAG) {
        Write-ColorOutput Yellow "Stop requested, skipping remaining tests..."
        return
    }
    Write-ColorOutput Green "[1/9] Running Activity tests..."
    Run-TestCommand "$TEST_DIR\Activity\*.yaml"
    if ($LASTEXITCODE -ne 0) { Write-ColorOutput Red "Activity tests: FAILED" }
    
    if (Test-Path $STOP_FLAG) {
        Write-ColorOutput Yellow "Stop requested, skipping remaining tests..."
        return
    }
    Write-Output ""
    Write-ColorOutput Green "[2/9] Running Login tests..."
    Run-TestCommand "$TEST_DIR\Login\*.yaml"
    if ($LASTEXITCODE -ne 0) { Write-ColorOutput Red "Login tests: FAILED" }
    
    if (Test-Path $STOP_FLAG) {
        Write-ColorOutput Yellow "Stop requested, skipping remaining tests..."
        return
    }
    Write-Output ""
    Write-ColorOutput Green "[3/9] Running LogOut tests..."
    Run-TestCommand "$TEST_DIR\LogOut\*.yaml"
    if ($LASTEXITCODE -ne 0) { Write-ColorOutput Red "LogOut tests: FAILED" }
    
    if (Test-Path $STOP_FLAG) {
        Write-ColorOutput Yellow "Stop requested, skipping remaining tests..."
        return
    }
    Write-Output ""
    Write-ColorOutput Green "[4/9] Running Profile Email tests (excluding delete-email and valid-email-change)..."
    Run-TestCommand "$TEST_DIR\Profile\Email\already-registered-email-change.yaml"
    if ($LASTEXITCODE -ne 0) { Write-ColorOutput Red "already-registered-email-change: FAILED" }
    
    if (Test-Path $STOP_FLAG) {
        Write-ColorOutput Yellow "Stop requested, skipping remaining tests..."
        return
    }
    Run-TestCommand "$TEST_DIR\Profile\Email\invalid-email-change.yaml"
    if ($LASTEXITCODE -ne 0) { Write-ColorOutput Red "invalid-email-change: FAILED" }
    
    if (Test-Path $STOP_FLAG) {
        Write-ColorOutput Yellow "Stop requested, skipping remaining tests..."
        return
    }
    Write-Output ""
    Write-ColorOutput Green "[5/9] Running Profile Name tests..."
    Run-TestCommand "$TEST_DIR\Profile\Name\*.yaml"
    if ($LASTEXITCODE -ne 0) { Write-ColorOutput Red "Profile Name tests: FAILED" }
    
    if (Test-Path $STOP_FLAG) {
        Write-ColorOutput Yellow "Stop requested, skipping remaining tests..."
        return
    }
    Write-Output ""
    Write-ColorOutput Green "[6/9] Running Profile PhoneNumber tests..."
    Run-TestCommand "$TEST_DIR\Profile\PhoneNumber\*.yaml"
    if ($LASTEXITCODE -ne 0) { Write-ColorOutput Red "Profile PhoneNumber tests: FAILED" }
    
    if (Test-Path $STOP_FLAG) {
        Write-ColorOutput Yellow "Stop requested, skipping remaining tests..."
        return
    }
    Write-Output ""
    Write-ColorOutput Green "[7/9] Running Profile Photo tests..."
    Run-TestCommand "$TEST_DIR\Profile\ProfilePhoto\*.yaml"
    if ($LASTEXITCODE -ne 0) { Write-ColorOutput Red "Profile Photo tests: FAILED" }
    
    if (Test-Path $STOP_FLAG) {
        Write-ColorOutput Yellow "Stop requested, skipping remaining tests..."
        return
    }
    Write-Output ""
    Write-ColorOutput Green "[8/9] Running Register tests..."
    Run-TestCommand "$TEST_DIR\Register\*.yaml"
    if ($LASTEXITCODE -ne 0) { Write-ColorOutput Red "Register tests: FAILED" }
    
    if (Test-Path $STOP_FLAG) {
        Write-ColorOutput Yellow "Stop requested, skipping remaining tests..."
        return
    }
    Write-Output ""
    Write-ColorOutput Green "[9/9] Running Settings tests..."
    Run-TestCommand "$TEST_DIR\Settings\**\*.yaml"
    if ($LASTEXITCODE -ne 0) { Write-ColorOutput Red "Settings tests: FAILED" }
}

function Generate-Summary {
    Write-ColorOutput Green "Generating test summary..."
    $summary = @"
=========================================
RIDER APP - REGRESSION TEST SUMMARY
=========================================
Date: $TIMESTAMP

Test Suites Executed:
  1. Activity
  2. Login
  3. LogOut
  4. Profile/Email (excluding delete-email.yaml and valid-email-change.yaml)
  5. Profile/Name
  6. Profile/PhoneNumber
  7. Profile/ProfilePhoto
  8. Register
  9. Settings

Full report: $REPORT_FILE
=========================================
"@
    $summary | Out-File -FilePath $SUMMARY_FILE -Encoding UTF8
    Write-ColorOutput Green "Summary report generated: $SUMMARY_FILE"
}

function Stop-Regression {
    Write-ColorOutput Yellow "Requesting regression tests to stop..."
    "" | Out-File -FilePath $STOP_FLAG
    Write-ColorOutput Green "Stop flag created. Tests will stop after current suite completes."
    Write-ColorOutput Yellow "Note: If tests don't stop, you can also press Ctrl+C"
}

function Clean-Reports {
    Write-ColorOutput Yellow "Cleaning up reports and stop flags..."
    if (Test-Path $STOP_FLAG) {
        Remove-Item $STOP_FLAG -Force
    }
    if (Test-Path $REPORT_DIR) {
        Remove-Item "$REPORT_DIR\*" -Force -ErrorAction SilentlyContinue
        Write-ColorOutput Green "Reports cleaned."
    } else {
        Write-ColorOutput Yellow "No reports directory found."
    }
}

# Main command router
switch ($Command.ToLower()) {
    "help" { Show-Help }
    "regression" { Run-Regression }
    "stop" { Stop-Regression }
    "clean" { Clean-Reports }
    "login" {
        Write-ColorOutput Green "Running Login tests..."
        Run-TestCommand "$TEST_DIR\Login\*.yaml"
    }
    "login-valid" {
        Write-ColorOutput Green "Running valid login tests..."
        Run-TestCommand "$TEST_DIR\Login\login-with-valid-*.yaml"
    }
    "login-invalid" {
        Write-ColorOutput Green "Running invalid login tests..."
        Run-TestCommand "$TEST_DIR\Login\login-with-invalid-*.yaml"
        Run-TestCommand "$TEST_DIR\Login\login-with-not-registered-*.yaml"
    }
    "register" {
        Write-ColorOutput Green "Running Registration tests..."
        Run-TestCommand "$TEST_DIR\Register\*.yaml"
    }
    "profile" {
        Write-ColorOutput Green "Running Profile tests..."
        Run-TestCommand "$TEST_DIR\Profile\**\*.yaml"
    }
    "profile-email" {
        Write-ColorOutput Green "Running Profile Email tests..."
        Run-TestCommand "$TEST_DIR\Profile\Email\*.yaml"
    }
    "profile-name" {
        Write-ColorOutput Green "Running Profile Name tests..."
        Run-TestCommand "$TEST_DIR\Profile\Name\*.yaml"
    }
    "profile-phone" {
        Write-ColorOutput Green "Running Profile Phone tests..."
        Run-TestCommand "$TEST_DIR\Profile\PhoneNumber\*.yaml"
    }
    "profile-photo" {
        Write-ColorOutput Green "Running Profile Photo tests..."
        Run-TestCommand "$TEST_DIR\Profile\ProfilePhoto\*.yaml"
    }
    "settings" {
        Write-ColorOutput Green "Running Settings tests..."
        Run-TestCommand "$TEST_DIR\Settings\**\*.yaml"
    }
    "settings-addresses" {
        Write-ColorOutput Green "Running MyAddresses tests..."
        Run-TestCommand "$TEST_DIR\Settings\MyAddresses\*.yaml"
    }
    "settings-language" {
        Write-ColorOutput Green "Running Language change tests..."
        Run-TestCommand "$TEST_DIR\Settings\LanguageChange\*.yaml"
    }
    "settings-theme" {
        Write-ColorOutput Green "Running Theme change tests..."
        Run-TestCommand "$TEST_DIR\Settings\ThemeChange\*.yaml"
    }
    "activity" {
        Write-ColorOutput Green "Running Activity tests..."
        Run-TestCommand "$TEST_DIR\Activity\*.yaml"
    }
    "logout" {
        Write-ColorOutput Green "Running Logout test..."
        Run-TestCommand "$TEST_DIR\LogOut\*.yaml"
    }
    default {
        Write-ColorOutput Red "Unknown command: $Command"
        Write-Output "Run '.\run.ps1 help' to see available commands."
    }
}

