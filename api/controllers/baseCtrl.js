'use strict';

let util = require('util');
let mongoose = require('mongoose');
let moment = require('moment');
let { Base, Client, Sensor } = require('./../models/model.js');

mongoose.connect('mongodb://127.0.0.1:27017/arduino');

function getBaseByClient(req, res) {
  let idClient = req.swagger.params.id_client.value;

  Base.find({"id_client": idClient}, function (err, arduino) {
    if (err) console.log(err);
    if (!arduino) return;

    res.json(arduino);

  });
}

function getAllSensorBySerialNum(req, res) {
    let idClient = req.swagger.params.id_client.value;
    let serialNum = req.swagger.params.serial_num.value;

    Base.find({"id_client": idClient, "num_serie": serialNum}, function (err, arduino) {
        if (err) console.log(err);
        if (!arduino) return;

        res.json(arduino);

    });
}

function getSensorBySerialNum(req, res) {
    let idClient = req.swagger.params.id_client.value;
    let serialNum = req.swagger.params.serial_num.value;
    let typeModule = req.swagger.params.type_module.value;

    Base.find({"id_client": idClient, "num_serie": serialNum}, function (err, arduino) {
        if (err) console.log(err);
        if (!arduino) return;

        for (let ard of arduino){
            Sensor.find({"serial_num": ard.serial_num, "type_module": typeModule}, function (err, sensor) {
                res.json(sensor);
            });
        }
    });
}

function getSensorByLocation(req, res) {
    let idClient = req.swagger.params.id_client.value;
    let location = req.swagger.params.location.value;

    Base.find({"id_client": idClient, "location": location}, function (err, arduino) {
        if (err) console.log(err);
        if (!arduino) return;

        for (let ard of arduino){
            Sensor.find({"serial_num": ard.serial_num}, function (err, sensor) {
                res.json(sensor);
            });
        }
    });
}


function addClient(req) {
    let clientId = req.swagger.params.client.value.client_id;
    let clientName = req.swagger.params.client.value.name;
    let clientAddress = req.swagger.params.client.value.address;

    let client = new Client({
        client_id: clientId,
        name: clientName,
        address: clientAddress
    });

    client.save(function(err) {
        if (err) console.log(err);
    });
}

function addBase(req) {
    let baseSerialNum = req.swagger.params.base.value.serial_num;
    let baseLocation = req.swagger.params.base.value.location;
    let baseIdClient = req.swagger.params.base.value.id_client;
    let baseGamme = req.swagger.params.base.value.gamme;

    let base = new Base({
        serial_num: baseSerialNum,
        location: baseLocation,
        client_id: baseIdClient,
        gamme: baseGamme,
        activate: false,
        sound_alert: false
    });

    base.save(function(err) {
        if (err) console.log(err);
    });
}

function addSensor(req) {
    let sensorTypeModule = req.swagger.params.sensor.value.type_module;
    let sensorValue = req.swagger.params.sensor.value.value;
    let sensorSerialNum = req.swagger.params.sensor.value.serial_num;

    let sensor = new Sensor({
        date: moment().format(),
        type_module: sensorTypeModule,
        value: sensorValue,
        serial_num: sensorSerialNum
    });

    sensor.save(function(err) {
        if (err) console.log(err);
    });
}

function updateSensorAlarmValue(req) {
    let serialNum = req.swagger.params.serial_num.value;
    let alarm = req.swagger.params.sensor.value.alarm;

    Sensor.findOneAndUpdate({"serial_num": serialNum}, {"alarm": alarm}, {new: true}, function(err, sensor) {
        if (err) {
            console.log('got an error');
        } else {
            console.log(sensor);
        }
    });
}

function updateSensorSonorAlarmValue(req) {
    let serialNum = req.swagger.params.serial_num.value;
    let soundAlert = req.swagger.params.sensor.value.sound_alert;

    Sensor.findOneAndUpdate({"serial_num": serialNum}, {"sound_alert": soundAlert}, {new: true}, function(err, sensor) {
        if (err) {
            console.log('got an error');
        } else {
            console.log(sensor);
        }
    });
}

module.exports = {
    getAllSensorBySerialNum : getAllSensorBySerialNum,
    getSensorBySerialNum : getSensorBySerialNum,
    getSensorByLocation : getSensorByLocation,
    getBaseByClient : getBaseByClient,
    addClient : addClient,
    addBase : addBase,
    addSensor : addSensor,
    updateSensorAlarmValue: updateSensorAlarmValue,
    updateSensorSonorAlarmValue: updateSensorSonorAlarmValue
};
