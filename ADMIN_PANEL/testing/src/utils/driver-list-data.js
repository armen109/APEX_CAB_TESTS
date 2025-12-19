const driverListLocators = {
    search_field: 'input[placeholder="Search text"]',
    edit_driver_button: '[title="Edit Driver"]',
    status: '[title="All"]',
    first_name_filter: '#select2-first_name-container',
    filter_search: '[role="searchbox"]',
    filter_service: '#select2-service_name-container',
    filter_phone_number: '#contact_number',
    filter_service_type: '#select2-service_type-container',
    apply_button: '.btn.btn_primary_border.text-white'
}

const driverListConstants = {
    driver_name: "ADMIN PANEL TEST",
    searching_name: 'Test'
}

export {driverListLocators, driverListConstants}