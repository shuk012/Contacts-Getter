'use strict';

var fs = require('fs');
var AWS = require('aws-sdk');
var path = require('path');
var HunterSDK = require('hunterio');
var lineReader = require('line-reader');

const s3 = new AWS.S3();

var KEY = process.env.HUNTER_KEY

var hunter = new HunterSDK(KEY);

exports.getContacts = async function (event, context, callback) {
  var result = {
    statusCode: 500,
    body: 'failure',
    headers: { 'content-type': 'text/html' }
  };

  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

  // Download the file from the S3 source bucket. 
  try {

    const params = {
      Bucket: srcBucket,
      Key: srcKey
    };

    var listLeads = await s3.getObject(params).promise();
    lineReader.eachLine('/path/to/file', function (line) {
      console.log(line);
      hunter.domainSearch({
        domain: 'hubspot.com',
        seniority: ['senior','executive'],
        type: 'personal',
        department: ['executive','it','management','hr']
      }, function (err, body) {
        if (err) {
          console.log(err);
        } else {
          // Will contain same body as the raw API call
          console.log(body);
        }
      });
    
    });
    result = {
      statusCode: 200,
      body: 'success',
      headers: { 'content-type': 'text/html' }
    };
  } catch (error) {
    console.log(error);
  }
  
  callback(null, result);
};
