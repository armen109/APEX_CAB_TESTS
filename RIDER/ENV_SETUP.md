# Environment Variables Setup

This project uses environment variables to store sensitive credentials. Follow these steps to set up your environment.

## Quick Setup

1. **Create a `.env` file** in the root directory of the project
2. **Copy the template below** and fill in your actual values
3. **Never commit the `.env` file** to version control (it's already in `.gitignore`)

## Environment Variables Template

Create a `.env` file with the following variables:

```env
# Login Credentials
LOGIN_VALID_PHONE=77777777
LOGIN_VALID_OTP=1111
LOGIN_INVALID_PHONE=123812
LOGIN_NOT_REGISTERED_PHONE=00000000
LOGIN_INCORRECT_OTP=3456
LOGIN_VALID_EMAIL=test@apexcab.net
LOGIN_INVALID_EMAIL=test
LOGIN_NOT_REGISTERED_EMAIL=testing@test.test

# Profile Credentials
PROFILE_VALID_EMAIL=test@apexcab.net
PROFILE_VALID_PHONE=77777777
PROFILE_VALID_OTP=1111
PROFILE_ALREADY_REGISTERED_PHONE=77777777
PROFILE_INVALID_PHONE=12345
PROFILE_VALID_NAME=Testing
PROFILE_INVALID_NAME=t

# Registration Credentials
REGISTRATION_INVALID_PHONE=123812
REGISTRATION_INVALID_EMAIL=test
REGISTRATION_VALID_PHONE=99999999
REGISTRATION_INCORRECT_OTP=3456
REGISTRATION_ALREADY_REGISTERED_EMAIL=test@apexcab.net
REGISTRATION_ALREADY_REGISTERED_PHONE=77777777

# Ride Requests Credentials
RIDE_REQUESTS_TESTING_PICK_UP=ijevan
RIDE_REQUESTS_TESTING_PICK_UP2=getahovit
RIDE_REQUESTS_TESTING_DESTINATION=ijevan bus terminal
RIDE_REQUESTS_NOT_SUPPORTED_LOCATION=Moscow
RIDE_REQUESTS_BOOKING_RIDER_NAME=Test
RIDE_REQUESTS_BOOKING_RIDER_PHONE=88888888
```

## How It Works

The credential files in `creds/` directory automatically read from environment variables if they are set, otherwise they fall back to default values. This allows:

- **Local development**: Use `.env` file with your test credentials
- **CI/CD**: Use GitHub Secrets or other CI/CD environment variables
- **Team sharing**: Share `.env.example` template without exposing actual credentials

## Loading Environment Variables

### Windows (PowerShell)
```powershell
# Load .env file before running tests
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
        [Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process')
    }
}
make regression
```

### Windows (CMD)
```cmd
# Load .env file before running tests
for /f "tokens=1,2 delims==" %a in (.env) do set %a=%b
make regression
```

### Linux/Mac
```bash
# Load .env file before running tests
export $(cat .env | xargs)
make regression
```

Or use a tool like `dotenv`:
```bash
# Install dotenv-cli
npm install -g dotenv-cli

# Run with dotenv
dotenv make regression
```

## CI/CD Setup

For GitHub Actions, add these as **Repository Secrets**:
1. Go to your repository → Settings → Secrets and variables → Actions
2. Add each environment variable as a secret
3. The CI/CD workflow will automatically use them

## Security Notes

- ✅ `.env` is already in `.gitignore`
- ✅ Never commit actual credentials
- ✅ Use different credentials for different environments (dev, staging, prod)
- ✅ Rotate credentials regularly
- ✅ Use strong passwords/OTPs for production tests

