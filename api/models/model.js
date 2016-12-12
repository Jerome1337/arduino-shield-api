'use strict';

let mongoose = require('mongoose');

const Base = mongoose.model('bases', {
    serial_num: String,
    location: String,
    client_id: Number,
    gamme: String,
    activate: Boolean,
    sound_alert: Boolean
});

const Client = mongoose.model('clients', {
    client_id: Number,
    name: String,
    address: String
});

const Sensor = mongoose.model('sensors', {
    date: Date,
    type_module: String,
    value: String,
    serial_num: String
});

module.exports = {
    Base,
    Client,
    Sensor
};
