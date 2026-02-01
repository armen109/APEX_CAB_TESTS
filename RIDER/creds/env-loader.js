// Environment variable loader for Maestro tests
// This script loads environment variables and makes them available to test scripts
// Usage: In your creds files, use process.env.VARIABLE_NAME || 'default_value'

// Note: Maestro uses Node.js environment, so process.env is available
// For Windows compatibility, we ensure environment variables are loaded

if (typeof output === 'undefined') {
    var output = {};
}

// Helper function to get env var with fallback
function getEnv(key, defaultValue) {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
        return process.env[key];
    }
    return defaultValue;
}

// Export the helper function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getEnv: getEnv };
}

