const riderDetailsLocators = {
    rider_name_field: '#first_name',
    profile_photo_upload: '[class="upload-button"]',
    update_button: '#saveBtn',
    rider_section: '[href="#rider"]',
    rider_link: '.nav-link[href="https://admin.apexcab.net/rider"]',
    rider_edit_icon: '[title="Edit Rider"]',
    rider_name_error: '#first_name_error',
}

const riderDetailsConstants = {  
    profile_photo_path: 'testing/src/resources/profile_photo.jpg',
    pending_status: '[class="status-icon status-pending pr-3"]',
    active_status: '[class="status-icon status-active pr-3"]',
    rider_name: 'ADMIN PANEL TEST',
    updated_rider_name: 'UPDATED ADMIN PANEL TEST',
    invalid_rider_name: 'A',
}

export {riderDetailsLocators, riderDetailsConstants}