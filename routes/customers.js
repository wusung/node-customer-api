var request = require('request');
var express = require('express');
var router = express.Router();

var MAX_TEST_LENGTH = 100;
var customers = {};
var customersLength = 100;

// Add test cases
request('https://randomuser.me/api/?results=100', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var testData = JSON.parse(body);
        for (var i=0; i<MAX_TEST_LENGTH; i++) {
            var user = testData['results'][i]['user'];
            customers[i] = {
                'id': i,
                'firstName': user.name.first.toUpperCase().charAt(0) + user.name.first.substring(1),
                'lastName': user.name.last.toUpperCase().charAt(0) + user.name.last.substring(1),
                'email': user.email,
                'phone': user.phone
            };
        }
    }
});

router.param('name', function(req, res, next, name) {
    // do validation on name here
    // blah blah validation
    // log something so we know its working
    console.log('doing name validations on ' + name);

    // once validation is done save the new item in the req
    req.name = name;
    // go to the next thing
    next();
});

var makeResponseText = function(data) {
    var respText = {
        'status': 'ok',
        'data': data
    };

    return respText;
};

/* GET customers listing. */
router.get('/', function(req, res, next) {
    res.send(makeResponseText(Object.keys(customers).map(function(v) { return customers[v]; })));
});

router.get('/:name', function(req, res, next) {
    res.send(makeResponseText(customers[req.name]));
});

router.post('/', function(req, res) {
    var customer = req.body;
    customer['id'] = ++customersLength;
    customers[customer['id']] = customer;
    res.send(makeResponseText('Insert success'));
});

router.delete('/:name', function(req, res, next) {
    delete customers[req.name];
    res.send(makeResponseText('Delete success'));
});

router.put('/:name', function(req, res, next) {
    var oldItem = customers[req.name];
    oldItem['firstName'] = req.body['firstName'] + ' ' + customersLength;
    oldItem['lastName'] = req.body['lastName'] + ' ' + customersLength;
    oldItem['email'] = req.body['email'] + ' ' + customersLength;
    oldItem['phone'] = req.body['phone'] + ' ' + customersLength;
    res.send(makeResponseText('Update success'));
});

module.exports = router;
