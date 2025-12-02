const serviceLocators = {
    name_field: '#name',
    sub_name_field: '#sub_name',
    region_field: '#select2-region_id-container',
    select_option: '[role="option"]',
    base_fare_field: '#base_fare',
    minimum_distance_field: '#minimum_distance',
    per_distance_field: '#per_distance',
    per_minute_field: '#per_minute_drive',
    waiting_time_field: '#waiting_time_limit',
    per_minute_wait_field: '#per_minute_wait',
    city_per_distance_field: '#city_per_distance',
    city_per_minute_field: '#city_per_minute',
    status_field: '#select2-status-container',
    type_field: '#select2-service_type_id-container',
    image_service_field: '[name="service_image"]',
    description_field: '#description',
    save_button: '[value="Save"]',
}

const serviceConstants = {
    service_name: 'Testing Service',
    service_sub_name: 'Test Sub Service',
    service_region: 'Lori',
    base_fare: '5',
    minimum_distance: '2',
    per_distance: '15',
    per_minute: '3',
    waiting_time: '10',
    per_minute_wait: '2',
    city_per_distance: '1.2',
    city_per_minute: '0.8',
    status: 'Inactive',
    type: 'Start',
    description: 'This is a test service created for testing purposes.',
    service_path: 'testing/src/resources/profile_photo.jpg',

}

export {serviceLocators, serviceConstants}