output.extractedData = output.extractedData || {};

if (output.rawAddressText) {
    var parts = output.rawAddressText.split('\n');
    var cleanAddress = parts.length > 1 ? parts[1].trim() : output.rawAddressText;
    
    output.extractedData.capturedAddress = ".*" + cleanAddress + ".*";    
}

if (output.rawPriceText) {
    var priceRegex = /(֏\s?\d+)/;
    var match = output.rawPriceText.match(priceRegex);
    var cleanPrice = match ? match[1] : output.rawPriceText;
    
    output.extractedData.capturedPrice = ".*" + cleanPrice + ".*";    
}