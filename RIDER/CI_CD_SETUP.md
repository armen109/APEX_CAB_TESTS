# CI/CD Setup Guide

This guide explains how to set up continuous integration for the Rider App regression tests.

## GitHub Actions Setup

### 1. Add Repository Secrets

Go to your GitHub repository:
- **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add the following secrets (use the values from your `.env` file):

#### Login Credentials
- `LOGIN_VALID_PHONE`
- `LOGIN_VALID_OTP`
- `LOGIN_INVALID_PHONE`
- `LOGIN_NOT_REGISTERED_PHONE`
- `LOGIN_INCORRECT_OTP`
- `LOGIN_VALID_EMAIL`
- `LOGIN_INVALID_EMAIL`
- `LOGIN_NOT_REGISTERED_EMAIL`

#### Profile Credentials
- `PROFILE_VALID_EMAIL`
- `PROFILE_VALID_PHONE`
- `PROFILE_VALID_OTP`
- `PROFILE_ALREADY_REGISTERED_PHONE`
- `PROFILE_INVALID_PHONE`
- `PROFILE_VALID_NAME`
- `PROFILE_INVALID_NAME`

#### Registration Credentials
- `REGISTRATION_INVALID_PHONE`
- `REGISTRATION_INVALID_EMAIL`
- `REGISTRATION_VALID_PHONE`
- `REGISTRATION_INCORRECT_OTP`
- `REGISTRATION_ALREADY_REGISTERED_EMAIL`
- `REGISTRATION_ALREADY_REGISTERED_PHONE`

#### Ride Requests Credentials
- `RIDE_REQUESTS_TESTING_PICK_UP`
- `RIDE_REQUESTS_TESTING_PICK_UP2`
- `RIDE_REQUESTS_TESTING_DESTINATION`
- `RIDE_REQUESTS_NOT_SUPPORTED_LOCATION`
- `RIDE_REQUESTS_BOOKING_RIDER_NAME`
- `RIDE_REQUESTS_BOOKING_RIDER_PHONE`

### 2. Workflow Triggers

The workflow is configured to run on:
- **Push** to `main`, `develop`, or `master` branches
- **Pull requests** to `main`, `develop`, or `master` branches
- **Manual trigger** via GitHub Actions UI (workflow_dispatch)

### 3. Workflow Features

- ✅ Automatically installs Maestro if needed
- ✅ Loads environment variables from GitHub Secrets
- ✅ Runs regression tests
- ✅ Uploads test reports as artifacts
- ✅ Continues even if some tests fail (for full coverage)

### 4. Viewing Results

After a workflow run:
1. Go to **Actions** tab in your repository
2. Click on the workflow run
3. Download **test-reports** and **test-summary** artifacts
4. View the logs for detailed test output

## Other CI/CD Platforms

### Azure DevOps

Create a pipeline YAML file (`.azure-pipelines.yml`):

```yaml
trigger:
  branches:
    include:
      - main
      - develop

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
  
  - script: |
      curl -Ls "https://get.maestro.mobile.dev" | bash
      export PATH="$PATH:$HOME/.maestro/bin"
      echo "##vso[task.prependpath]$HOME/.maestro/bin"
    displayName: 'Install Maestro'
  
  - script: |
      export $(cat .env | xargs)
      make regression
    displayName: 'Run Regression Tests'
    env:
      LOGIN_VALID_PHONE: $(LOGIN_VALID_PHONE)
      # ... add all other variables
```

### Jenkins

Create a Jenkinsfile:

```groovy
pipeline {
    agent any
    
    environment {
        LOGIN_VALID_PHONE = credentials('login-valid-phone')
        // ... add all other credentials
    }
    
    stages {
        stage('Install Maestro') {
            steps {
                sh 'curl -Ls "https://get.maestro.mobile.dev" | bash'
                sh 'export PATH="$PATH:$HOME/.maestro/bin"'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'make regression'
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true
        }
    }
}
```

### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
stages:
  - test

regression-tests:
  stage: test
  image: node:18
  before_script:
    - curl -Ls "https://get.maestro.mobile.dev" | bash
    - export PATH="$PATH:$HOME/.maestro/bin"
  script:
    - make regression
  artifacts:
    paths:
      - reports/
    expire_in: 30 days
  variables:
    LOGIN_VALID_PHONE: $LOGIN_VALID_PHONE
    # ... add all other variables in GitLab CI/CD variables
```

## Notes

- The Makefile uses Windows commands. For Linux CI/CD, you may need to:
  - Use `bash` instead of `cmd` commands
  - Adjust file paths (use `/` instead of `\`)
  - Use `mkdir -p` instead of `if not exist ... mkdir`
  
- Consider creating a `Makefile.linux` or using a cross-platform build tool if you need to support both Windows and Linux.

- For Windows-based CI/CD (like Azure DevOps Windows agents), the current Makefile should work as-is.

