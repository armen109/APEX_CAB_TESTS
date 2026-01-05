output.customerSupportCreds = {
    customer_request_text: "I have a problem with my account. testing",
};

output.customerSupportCreds.customer_request_assertion =
    `.*${output.customerSupportCreds.customer_request_text}.*`;
