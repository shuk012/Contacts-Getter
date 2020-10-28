'use strict';

var fs = require('fs');
var path = require('path');

exports.getContacts = function(event, context, callback) {
  
  var result = {
    statusCode: 200,
    body: contents.toString(),
    headers: {'content-type': 'text/html'}
  };

  callback(null, result);
};
