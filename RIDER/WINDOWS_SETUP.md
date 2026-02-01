# Windows Setup Guide

This guide helps you set up and run tests on Windows without needing Make.

## Quick Start

### Option 1: Use PowerShell Script (Recommended)

The `run.ps1` script provides all the same functionality as the Makefile, but works natively on Windows.

#### First Time Setup

1. **Enable PowerShell Script Execution** (if needed):
   ```powershell
   # Run PowerShell as Administrator
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. **Test the script**:
   ```powershell
   .\run.ps1 help
   ```

#### Running Tests

```powershell
# Show all available commands
.\run.ps1 help

# Run regression tests
.\run.ps1 regression

# Run specific test suites
.\run.ps1 login
.\run.ps1 register
.\run.ps1 profile
.\run.ps1 settings
```

### Option 2: Install Make (Alternative)

If you prefer using the Makefile:

1. **Install Make via Chocolatey**:
   ```powershell
   # Install Chocolatey first (if not installed)
   # Then install Make
   choco install make
   ```

2. **Or use GnuWin32 Make**:
   - Download from: http://gnuwin32.sourceforge.net/packages/make.htm
   - Add to PATH

3. **Then use Makefile commands**:
   ```bash
   make help
   make regression
   ```

## PowerShell Script Features

The `run.ps1` script includes:

- ✅ All Makefile functionality
- ✅ Automatic `.env` file loading
- ✅ Colored output
- ✅ Stop mechanism (`.\run.ps1 stop`)
- ✅ Test reporting
- ✅ Cross-platform path handling

## Common Issues

### "Execution of scripts is disabled on this system"

**Solution:**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "Cannot run script because running scripts is disabled"

**Solution:**
```powershell
# Check current policy
Get-ExecutionPolicy

# Set policy for current user
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or bypass for single execution
powershell -ExecutionPolicy Bypass -File .\run.ps1 help
```

### "Maestro not found"

**Solution:**
1. Install Maestro: https://maestro.mobile.dev/
2. Ensure Maestro is in your PATH
3. Verify installation: `maestro --version`

### Environment Variables Not Loading

**Solution:**
1. Ensure `.env` file exists in project root
2. Check `.env` file format (no spaces around `=`)
3. Verify file encoding is UTF-8

## Comparison: PowerShell vs Make

| Feature | PowerShell Script | Makefile |
|---------|------------------|----------|
| Windows Native | ✅ Yes | ❌ Requires installation |
| Linux/Mac | ❌ No | ✅ Yes |
| .env Loading | ✅ Automatic | ⚠️ Manual |
| Colored Output | ✅ Yes | ✅ Yes |
| Stop Mechanism | ✅ Yes | ✅ Yes |

## Recommended Approach

- **Windows users**: Use `run.ps1` script
- **Linux/Mac users**: Use `Makefile` with `make` command
- **CI/CD**: Use platform-appropriate method

## Next Steps

1. ✅ Set up `.env` file (see `ENV_SETUP.md`)
2. ✅ Test with `.\run.ps1 help`
3. ✅ Run regression: `.\run.ps1 regression`
4. ✅ Check reports in `reports/` directory

