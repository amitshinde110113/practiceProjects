const bookingResolver = require('./bookings')
const usersResolver = require('./users')
const eventsResolver = require('./events')
const authResolver = require('./auth')

module.exports = {
    ...eventsResolver,
    ...usersResolver,
    ...bookingResolver,
    ...authResolver
}

