const loginLocators = {
    email_field: "#email",
    password_field: "#password-input",
    submit_button: "button[type='submit']",
    error_alert: '[role="alert"]',
    error_alert_text: " Invalid email or password. ",
    login_title: "Log in to your account",
}

const loginConstants = {
    admin_email: "it@apexcab.net",
    admin_password: "k60zGO3n*stW",
    invalid_email: "invalid@apex.com",
    invalid_password: "invalid",
    
}

export {loginLocators, loginConstants}