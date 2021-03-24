const Event = require('../../models/events')
const User = require('../../models/users')
const Booking = require('../../models/booking')

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return { ...user._doc, _id: user.id, createdEvents: events.bind(this, user.createdEvents) };
    } catch (error) {
        throw error
    }
}
const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        return events.map(event => {
            return {
                ...event._doc,
                _id: event.id,
                creator: user.bind(this, event.creator)
            };
        })
    } catch (e) {
        throw e;
    }
}

const getEvent = async eventId => {
    try {
        const event = await Event.findById(eventId)
        return {
            ...event._doc,
            _id: event.id,
            creator: user.bind(this, event.creator)
        };
    } catch (error) {
        throw error
    }
}

exports.user=user;
exports.getEvent=getEvent;
exports.events=events;
