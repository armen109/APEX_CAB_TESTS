// Load environment variables with fallback to defaults
// Sensitive credentials should be set via .env file
output.loginCreds={
    valid_phone_number: (typeof process !== 'undefined' && process.env && process.env.LOGIN_VALID_PHONE) ? process.env.LOGIN_VALID_PHONE : "77777777",
    valid_otp: (typeof process !== 'undefined' && process.env && process.env.LOGIN_VALID_OTP) ? process.env.LOGIN_VALID_OTP : "1111",
    invalid_phone_number: (typeof process !== 'undefined' && process.env && process.env.LOGIN_INVALID_PHONE) ? process.env.LOGIN_INVALID_PHONE : "123812",
    not_registered_phone: (typeof process !== 'undefined' && process.env && process.env.LOGIN_NOT_REGISTERED_PHONE) ? process.env.LOGIN_NOT_REGISTERED_PHONE : "00000000",
    incorrect_otp: (typeof process !== 'undefined' && process.env && process.env.LOGIN_INCORRECT_OTP) ? process.env.LOGIN_INCORRECT_OTP : "3456",
    valid_email: (typeof process !== 'undefined' && process.env && process.env.LOGIN_VALID_EMAIL) ? process.env.LOGIN_VALID_EMAIL : "test@apexcab.net",
    invalid_email: (typeof process !== 'undefined' && process.env && process.env.LOGIN_INVALID_EMAIL) ? process.env.LOGIN_INVALID_EMAIL : "test",
    not_registered_email: (typeof process !== 'undefined' && process.env && process.env.LOGIN_NOT_REGISTERED_EMAIL) ? process.env.LOGIN_NOT_REGISTERED_EMAIL : "testing@test.test"
}