// Load environment variables with fallback to defaults
// Sensitive credentials should be set via .env file
output.profileCreds={
    valid_email: (typeof process !== 'undefined' && process.env && process.env.PROFILE_VALID_EMAIL) ? process.env.PROFILE_VALID_EMAIL : "test@apexcab.net",
    valid_phone: (typeof process !== 'undefined' && process.env && process.env.PROFILE_VALID_PHONE) ? process.env.PROFILE_VALID_PHONE : "77777777",
    valid_otp: (typeof process !== 'undefined' && process.env && process.env.PROFILE_VALID_OTP) ? process.env.PROFILE_VALID_OTP : "1111",
    already_registered_phone: (typeof process !== 'undefined' && process.env && process.env.PROFILE_ALREADY_REGISTERED_PHONE) ? process.env.PROFILE_ALREADY_REGISTERED_PHONE : "77777777",
    invalid_phone: (typeof process !== 'undefined' && process.env && process.env.PROFILE_INVALID_PHONE) ? process.env.PROFILE_INVALID_PHONE : "12345",
    valid_name: (typeof process !== 'undefined' && process.env && process.env.PROFILE_VALID_NAME) ? process.env.PROFILE_VALID_NAME : "Testing",
    invalid_name: (typeof process !== 'undefined' && process.env && process.env.PROFILE_INVALID_NAME) ? process.env.PROFILE_INVALID_NAME : "t",
}