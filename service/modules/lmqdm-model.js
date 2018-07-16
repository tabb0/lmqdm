var Promise = require("bluebird");
var cisdb = require('cis/db.js');
var fs = require('fs');

// Mongo Instance Connection
var _globalMongoInstances = [];

// Vars
var _database = "LMQDM";
var _participantesCollection = "Participantes";

function GetMongoInstance(dbName) {
    var j = _globalMongoInstances.length;
    for (var i = 0; i < j; i++) {
        if (_globalMongoInstances[i].dbName == dbName) {
            return _globalMongoInstances[i].instance;
        }
    }

    var _instance = cisdb.dbOps.init(dbName);
    _globalMongoInstances.push(
        {
            dbName: dbName,
            instance: _instance
        }
    );

    return _instance;
};

function sortByKey(array, key, direction) {
    if (direction == undefined) direction = 1; // Ascending
    return array.sort(function (a, b) {
        if (direction == 1) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
        else {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

exports.Participantes = function () {

    function ProcessRanking() {
        return [];
    }

    return {
        List: function () {
            return new Promise(function (resolve, reject) {

                var databaseName = _database;
                var participantesCollection = _participantesCollection;

                // Connects to the databse
                cisdb.dbOps.connectDB(GetMongoInstance(databaseName), databaseName, function (err, db) {
                    if (err) {
                        db.close();
                        reject(err);
                        return;
                    }

                    // Ready. It will execute the search query
                    var c = db.collection(participantesCollection);

                    var cursor = c.find({ });

                    cursor.toArray(function (err, result) {
                        db.close();

                        if (err) {
                            reject(err);
                            return;
                        }

                        var sorted = sortByKey(result, "Puntos", 1);

                        resolve(sorted);
                    });
                });
            });
        },
        Get: function(name) {
            return new Promise(function (resolve, reject) {

                var databaseName = _database;
                var participantesCollection = _participantesCollection;

                // Connects to the databse
                cisdb.dbOps.connectDB(GetMongoInstance(databaseName), databaseName, function (err, db) {
                    if (err) {
                        db.close();
                        reject(err);
                        return;
                    }

                    // Ready. It will execute the search query
                    var c = db.collection(participantesCollection);

                    var cursor = c.find({"Nombre": name});

                    cursor.toArray(function (err, result) {
                        db.close();

                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve(result);
                    });
                });
            });
        }
    }
}();

exports.Matches = function() {
    return {
        
    }
}();