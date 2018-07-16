// NodeJS Required Imports
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var csv = require('csv');
var request = require('request');
var express = require('express');
var url = require('url');
var spawn = require('child_process').spawn;
var bodyParser = require('body-parser');
var connect = require('connect');

var cisdb = require('cis/db.js');
// var globaOps = require('./globalModel.js');
// var helpers = require('./Helpers.js');
var cors = require('cors');

// Model Imports
var modelModule = require('./modules/lmqdm-model.js');

// Setups the API's App
var app = require('express.io')()
app.http().io()
app.use(bodyParser());
app.use(cors());
app.options('*', cors());

var printDebugTarce = false;

function routeTracer(msg, request) {
    console.log("-> " + msg + " received. (" + new Date() + ")");

    if (request != undefined && printDebugTarce) {
        console.log("Request Received:");
        console.log(request.body);
    }
}

function Tracer(msg, data) {
    console.log("")
    console.log("  ---> " + msg);
    console.log(JSON.stringify(data));
    console.log("  ---> EOL //")
    console.log("")
}

function DefaultReturnMessage(status, msg, code, data) {
    if (data == undefined) data = {};
    return {
        status: status,
        message: msg,
        code: code,
        data: data
    }
}

app.get('/status', function (req, res) {
    res.send({
        "Current-Time": new Date(),
        "Status": "Running"
    })
});

app.get('/participantes', function (req, res) {
    routeTracer("/participantes", req);

    // Validations

    // Gets any parameters received on the post body
    // var clientId = "";

    // if (req.body.clientId != undefined) {
    //     clientId = req.body.clientId;
    // }

    // Route Code

    try {
        // Executes the main core objective of this service
        modelModule.Participantes.List()
            .then(function (response) {
                res.send(DefaultReturnMessage(true, "Ok.", 0, response));
            })
            .catch(function (error) {
                res.send(DefaultReturnMessage(false, "Error while getting the data.", 902, error));
            });
    }
    catch (err) {
        res.send(DefaultReturnMessage(false, "Generic Error Found.", 908, err));
    }
});

app.get('/participante/:name', function (req, res) {
    routeTracer("/participante", req);

    // Validations

    // Gets any parameters received on the post body
    var name = "";

    if (req.params.name != undefined) {
        name = req.params.name;
    }

    // Route Code

    try {
        // Executes the main core objective of this service
        modelModule.Participantes.Get(name)
            .then(function (response) {
                res.send(DefaultReturnMessage(true, "Ok.", 0, response));
            })
            .catch(function (error) {
                res.send(DefaultReturnMessage(false, "Error while getting the data.", 902, error));
            });
    }
    catch (err) {
        res.send(DefaultReturnMessage(false, "Generic Error Found.", 908, err));
    }
});


// Starts the Listener Server
var _port = 8078;
app.listen(_port);
console.log("-------------------------------------------------------------");
console.log(" LMQDM ");
console.log(" API Running on port: ", _port);
console.log("-------------------------------------------------------------");