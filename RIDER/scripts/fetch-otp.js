const API_KEY = "sk_8l97mXVih1Xr5fXs_UErXNsXcuFlpkKLeqDYC8ROMG1jloMWwzzma2rArQGhpq9Z8ghT2VwjJeLAZPdaD";
const BASE_URL = "https://api.mailslurp.com";

function createMailSlurpInbox() {
    var response = http.post(BASE_URL + '/inboxes?apiKey=' + API_KEY, {
        body: JSON.stringify({}), 
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response || !response.body) {
        throw new Error(`Failed to create inbox`);
    }
    
    var inbox = JSON.parse(response.body);
    
    if (!inbox || !inbox.id) {
        throw new Error(`Invalid inbox response`);
    }

    output.inboxId = inbox.id;
    output.emailAddress = inbox.emailAddress;
}

function getOtpCode() {
    var url = BASE_URL + '/waitForLatestEmail?inboxId=' + output.inboxId + '&timeout=30000&apiKey=' + API_KEY;
    var response = http.get(url);
    
    if (!response || !response.body) {
        throw new Error("No email received");
    }
    
    var email = JSON.parse(response.body);
    var regex = /(?:^|\D)(\d{4})(?:\D|$)/; 
    var match = regex.exec(email.body);
    
    output.otpCode = match ? match[1] : "0000";
}

function deleteCurrentInbox() {
    http.delete(BASE_URL + '/inboxes/' + output.inboxId + '?apiKey=' + API_KEY);
}

output.createMailSlurpInbox = createMailSlurpInbox;
output.getOtpCode = getOtpCode;
output.createInbox = createMailSlurpInbox;
output.waitForOtp = getOtpCode;
output.deleteCurrentInbox = deleteCurrentInbox;