const supportChatLocators = {
    view_chat: '[title="View Support"]',
    edit_chat: '[title="Edit Support"]',
    message_field: '#messageInput',
    send_button: '[alt="Send"]',
    message_text: '[class="mr-2 mb-0 w-100 message-text"]',
    edit_message_field: '#editMessageInput',
    save_changes_button: 'Save Changes',
    status_field: '#select2-status-container',
    status_option: '[class="select2-results__option"]',
    save_button: 'input[type="submit"]',
}

const supportChatConstants = {
    complaining_user: 'ADMIN PANEL TEST',
    message: 'TESTING RESPONSE MESSAGE',
    new_message: 'UPDATED TESTING RESPONSE MESSAGE',
    pending_status: 'Pending',
    resolved_status: 'Resolved',
}

export {supportChatLocators, supportChatConstants}