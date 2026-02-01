# Rider App Test Automation

Automated test suite for the Rider mobile application using Maestro.

## Features

- ✅ Comprehensive test coverage for Login, Registration, Profile, Settings, and Ride Requests
- ✅ Environment variable support for secure credential management
- ✅ Regression test suite with reporting
- ✅ CI/CD integration ready
- ✅ Graceful test stopping mechanism

## Quick Start

### 1. Prerequisites

- [Maestro](https://maestro.mobile.dev/) installed
- **Windows**: PowerShell (included) - Use `run.ps1` script
- **Linux/Mac**: Make - Use `Makefile` commands
- Node.js (for scripts)

### 2. Setup Environment Variables

1. Copy the environment template (see `ENV_SETUP.md`)
2. Create a `.env` file in the root directory
3. Fill in your test credentials

See [ENV_SETUP.md](ENV_SETUP.md) for detailed instructions.

### 3. Run Tests

**Windows (PowerShell):**
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

**Linux/Mac (with Make installed):**
```bash
# Show all available commands
make help

# Run regression tests
make regression

# Run specific test suites
make login
make register
make profile
make settings
```

## Available Commands

### Windows (PowerShell)
Use `.\run.ps1 <command>` instead of `make <command>`

### Linux/Mac (Make)
Use `make <command>` as shown below

### Main Commands
- `help` / `make help` - Show all available commands
- `regression` / `make regression` - Run full regression test suite with reporting
- `stop` / `make stop` - Stop running regression tests gracefully
- `clean` / `make clean` - Clean up report files and stop flags

### Test Suites
- `make login` - Run all Login tests
- `make register` - Run all Registration tests
- `make profile` - Run all Profile tests
- `make settings` - Run all Settings tests
- `make activity` - Run Activity tests
- `make logout` - Run Logout test

### Individual Categories
- `make login-valid` - Run valid login tests
- `make login-invalid` - Run invalid login tests
- `make profile-email` - Run profile email tests
- `make profile-name` - Run profile name tests
- `make profile-phone` - Run profile phone tests
- `make profile-photo` - Run profile photo tests
- `make settings-addresses` - Run MyAddresses tests
- `make settings-language` - Run Language change tests
- `make settings-theme` - Run Theme change tests

## Stopping Tests

### Method 1: Keyboard Interrupt
Press `Ctrl+C` in the terminal running the tests.

### Method 2: Stop Command
In another terminal window:

**Windows:**
```powershell
.\run.ps1 stop
```

**Linux/Mac:**
```bash
make stop
```

The tests will stop after the current test suite completes.

## Test Reports

After running regression tests, reports are saved in the `reports/` directory:
- **Full report**: `test-report-YYYY-MM-DD_HH-mm-ss.txt`
- **Summary**: `test-summary-YYYY-MM-DD_HH-mm-ss.txt`

## Project Structure

```
RIDER/
├── creds/              # Credential files (reads from .env)
├── flows/              # Test flow files
│   ├── Activity/
│   ├── Login/
│   ├── LogOut/
│   ├── Profile/
│   ├── Register/
│   ├── RideRequests/
│   └── Settings/
├── regression/         # Regression test configurations
├── scripts/            # Helper scripts
├── selectors/          # UI selectors
├── reports/            # Test reports (generated)
└── Makefile            # Build automation
```

## CI/CD Integration

This project includes GitHub Actions workflow for automated testing. See [CI_CD_SETUP.md](CI_CD_SETUP.md) for:
- GitHub Actions setup
- Other CI/CD platform configurations
- Secret management

## Security

- ✅ Credentials stored in `.env` file (not committed)
- ✅ `.env` is in `.gitignore`
- ✅ Environment variables used in CI/CD
- ✅ Sensitive data never exposed in logs

## Regression Test Suite

The regression suite includes:
1. Activity tests
2. Login tests
3. LogOut tests
4. Profile Email tests (excluding delete-email and valid-email-change)
5. Profile Name tests
6. Profile PhoneNumber tests
7. Profile Photo tests
8. Register tests
9. Settings tests

## Troubleshooting

### Tests fail to read environment variables
- Ensure `.env` file exists in the root directory
- Check that variable names match exactly (case-sensitive)
- For Windows, you may need to load `.env` manually (see `ENV_SETUP.md`)

### Makefile commands not working on Windows
- **Use the PowerShell script instead**: `.\run.ps1 <command>` (see `WINDOWS_SETUP.md`)
- Or install Make via Chocolatey: `choco install make`
- Or use GnuWin32 Make
- Ensure Make is in your PATH if you want to use Makefile

### PowerShell script execution blocked
- Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Or run with: `powershell -ExecutionPolicy Bypass -File .\run.ps1 help`
- See `WINDOWS_SETUP.md` for details

### CI/CD tests failing
- Verify all secrets are set in your CI/CD platform
- Check that Maestro is installed correctly
- Review CI/CD logs for specific errors

## Contributing

1. Create a feature branch
2. Add your test cases
3. Update credentials in `.env` (don't commit)
4. Test locally with `make regression`
5. Submit a pull request

## License

[Your License Here]

