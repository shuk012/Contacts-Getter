'use strict';

import { readFileSync } from 'fs';
import { sep } from 'path';

module.exports.getContacts = (event, context, callback) => {
  var contents = readFileSync(`public${sep}index.html`);
  var result = {
    statusCode: 200,
    body: contents.toString(),
    headers: {'content-type': 'text/html'}
  };

  callback(null, result);
}
