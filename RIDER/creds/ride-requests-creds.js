// Load environment variables with fallback to defaults
// Sensitive credentials should be set via .env file
output.rideRequestsCreds={
    testing_pick_up: (typeof process !== 'undefined' && process.env && process.env.RIDE_REQUESTS_TESTING_PICK_UP) ? process.env.RIDE_REQUESTS_TESTING_PICK_UP : "ijevan",
    testing_pick_up2: (typeof process !== 'undefined' && process.env && process.env.RIDE_REQUESTS_TESTING_PICK_UP2) ? process.env.RIDE_REQUESTS_TESTING_PICK_UP2 : "getahovit",
    testing_destination: (typeof process !== 'undefined' && process.env && process.env.RIDE_REQUESTS_TESTING_DESTINATION) ? process.env.RIDE_REQUESTS_TESTING_DESTINATION : "ijevan bus terminal",
    not_supported_location: (typeof process !== 'undefined' && process.env && process.env.RIDE_REQUESTS_NOT_SUPPORTED_LOCATION) ? process.env.RIDE_REQUESTS_NOT_SUPPORTED_LOCATION : "Moscow",
    booking_rider_name: (typeof process !== 'undefined' && process.env && process.env.RIDE_REQUESTS_BOOKING_RIDER_NAME) ? process.env.RIDE_REQUESTS_BOOKING_RIDER_NAME : "Test",
    booking_rider_phone: (typeof process !== 'undefined' && process.env && process.env.RIDE_REQUESTS_BOOKING_RIDER_PHONE) ? process.env.RIDE_REQUESTS_BOOKING_RIDER_PHONE : "88888888",
}