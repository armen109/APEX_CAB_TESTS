const loginLocators = {
    email_field: "#email",
    password_field: "#password-input",
    submit_button: "button[type='submit']",
    error_alert: '[role="alert"]',
    error_alert_text: " Invalid email or password. ",
    login_title: "Log in to your account",
}

const loginConstants = {
    admin_email: process.env.ADMIN_EMAIL || "it@apexcab.net",
    admin_password: process.env.ADMIN_PASSWORD || "k60zGO3n*stW",
    invalid_email: process.env.INVALID_EMAIL || "invalid@apex.com",
    invalid_password: process.env.INVALID_PASSWORD || "invalid",
    
}

export {loginLocators, loginConstants}