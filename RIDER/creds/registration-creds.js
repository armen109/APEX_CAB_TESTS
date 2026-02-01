// Load environment variables with fallback to defaults
// Sensitive credentials should be set via .env file
output.registrationCreds={
    invalid_phone_number: (typeof process !== 'undefined' && process.env && process.env.REGISTRATION_INVALID_PHONE) ? process.env.REGISTRATION_INVALID_PHONE : "123812",
    invalid_email: (typeof process !== 'undefined' && process.env && process.env.REGISTRATION_INVALID_EMAIL) ? process.env.REGISTRATION_INVALID_EMAIL : "test",
    valid_phone_number: (typeof process !== 'undefined' && process.env && process.env.REGISTRATION_VALID_PHONE) ? process.env.REGISTRATION_VALID_PHONE : "99999999",
    incorrect_otp: (typeof process !== 'undefined' && process.env && process.env.REGISTRATION_INCORRECT_OTP) ? process.env.REGISTRATION_INCORRECT_OTP : "3456",
    already_registered_email: (typeof process !== 'undefined' && process.env && process.env.REGISTRATION_ALREADY_REGISTERED_EMAIL) ? process.env.REGISTRATION_ALREADY_REGISTERED_EMAIL : "test@apexcab.net",
    already_registered_phone: (typeof process !== 'undefined' && process.env && process.env.REGISTRATION_ALREADY_REGISTERED_PHONE) ? process.env.REGISTRATION_ALREADY_REGISTERED_PHONE : "77777777",
}