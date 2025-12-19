const driverEditConstants = {
    new_driver_name: "ADMIN PANEL TEST UPDATED",
    new_driver_last_name: "UPDATED",
    driver_name: "ADMIN PANEL TEST",
    driver_last_name: "TEST",
    id_number: "123456789",
    ssn_number: "12345678910",
    new_ssn_number: "10987654321",
    new_id_number: "987654321",
    driver_license_number: "A1234567",
    new_driver_license_number: "B7654321",
    invalid_driver_name: "A",
    invalid_driver_last_name: "B",
    invalid_id_number: "12",
    invalid_ssn_number: "123",
    invalid_driver_license_number: "C1",
    filtration_pending_name: 'Test',
    filtration_pending_status: 'Pending',
    filtration_pending_service: 'Start',
    filtration_pending_phone_number: '77777777',
    filtration_pending_service_type: 'ride',
    filtration_active_first_name: 'Vanik',
    filtration_active_service: 'Start',
    filtration_active_phone_number: '41223280',
    filtration_other_first_name: 'Հակոբ',
    filtration_other_phone_number: '41433235',
    filtration_other_status: 'Reject',
}

driverEditConstants.assertion_pending_phone_number =
    `374${driverEditConstants.filtration_pending_phone_number}`;

driverEditConstants.assertion_active_phone_number =
    `374${driverEditConstants.filtration_active_phone_number}`;

driverEditConstants.assertion_other_phone_number =
    `374${driverEditConstants.filtration_other_phone_number}`;

const driverEditLocators = {
    phone_number_field: "input#phone",
    email_field: "input#email",
    citizenship_field: '[name="driver_license"]',
    first_name_field: 'input#first_name',
    last_name_field: 'input#last_name',
    id_field: 'input#driver_document_number',
    ssn_field: 'input#ssn_number',
    driver_license_field: 'input#driver_license_number',
    id_expire_field: '#id_document_expiry_date',
    driver_license_expire_field: '#license_document_expiry',
    update_button: '#saveBtn',
    first_name_error: '#first_name_error',
    last_name_error: '#last_name_error',
    id_error: '#driver_document_number_error',
    ssn_error: '#ssn_number_error',
    driver_license_error: '#driver_license_number_error',
    vehicle_details_section: '[data-tab="vehicle_details"]',
    service_details_section: '[data-tab="service_details"]',
    driver_documents_section: '[data-tab="documents"]',
}

const driverVehicleDetailsLocators = {
    vehicle_registration_field: '[name="userDetail[registration_certificate]"]',
    car_make_field: '#select2-car_make_select_vehicle-container',
    car_model_field: '#select2-car_model_select_vehicle-container',
    car_select_option: '[role="option"]',
    car_production_year_field: '#select2-car_production_year-container',
    car_color_field: '[name="userDetail[car_color]"]',
    car_plate_number_field: '#car_plate_number',
    car_seats_field: '[name="userDetail[number_of_passenger_seats]"]',
    update_button: '#saveBtn',
    car_make_cross: '[title="Remove all items"]',
}

const driverVehicleDetailsConstants = {
    vehicle_registration_number: "ABC123456",
    car_make: "Acura",
    car_model: "EL",
    car_year: "2025",
    car_color: "Blue",
    car_plate_number: "TEST1234",
    car_seats: "5",
    new_vehicle_registration_number: "XYZ654321",
    new_car_make: "BMW",
    new_car_model: "X5",
    new_car_year: "2024",
    new_car_color: "Red",
    new_car_plate_number: "UPDATED5678",
    new_car_seats: "7",
    invalid_vehicle_registration_number: "12",
    invalid_car_color: "A",
    invalid_car_plate_number: "B",
    invalid_car_seats: "C",
}

const serviceDetailseLocators = {
    service_details_field: '#selected-tags-container-service',
    service_option: '.service-type-option',
    service_tag: '.service-type-icon',
    cross_icon: '.remove-tag',
};

const serviceDetailsConstants = {
    service_detail: 'Start',
    service_details_assertion: 'Start - Options',
};

const driverDocumentsLocators = {
    id_type_document: '[data-type="id"]',
    profile_photo_document: '[name="profile_photo_status"]',
    id_passport_document: '[name="id_document_status"]',
    driver_license_document: '[name="license_document_status"]',
    vehicle_details_document: '[name="vehicle_document_status"]',
    car_photos_document: '[name="car_photos_status"]',
    ssn_document: '[name="ssn_document_status"]',
    approved_status: 'approved',
    rejected_status: 'rejected',
    under_review: 'under_review',
};

const driverDocumentsConstants = {

};

export {driverEditLocators, driverEditConstants, driverVehicleDetailsConstants, driverVehicleDetailsLocators, serviceDetailseLocators, serviceDetailsConstants, driverDocumentsLocators, driverDocumentsConstants}