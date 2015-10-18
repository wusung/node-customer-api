var express = require('express');
var router = express.Router();

var customers = {};

var customersLength = 100;
for (var i = 0; i < 100; i++) {
    customers[i] = {
            'id': i,
            'firstName': 'firstName ' + i,
            'lastName': 'lastName ' + i,
            'address': 'Address ' + i
        };
}

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
}

/* GET customers listing. */
router.get('/', function(req, res, next) {
    res.send(makeResponseText(Object.keys(customers).map(function(v) { return customers[v]; })));
});

router.get('/:name', function(req, res, next) {
    res.send(makeResponseText(customers[req.name]));
});

router.post('/', function(req, res) {
    customers[++customersLength] = req.body;
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
    oldItem['address'] = req.body['address'] + ' ' + customersLength;
    res.send(makeResponseText('Update success'));
});

module.exports = router;
