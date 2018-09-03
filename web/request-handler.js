var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile(__dirname + '/public/index.html', (err, html) => {
      // console.log(html, 'this is the chunk');
      // if (err) {
      //   throw err;
      // }
      
      res.writeHeader(200, { 'Content-Type': 'text/html' });
      // res.write(html);
      res.end(html, 'utf-8');
    });
  } else {
    // console.log('this is the DIRRR', req.url);
    fs.readFile(archive.paths.archivedSites + req.url, (err, html) => {
      if (err) {
        res.writeHeader(404, { 'Content-Type': 'text/html' });
        res.end();
      }

      res.writeHeader(200, { 'Content-Type': 'text/html' });
      res.end(html, 'utf-8');
    });
    
  }
  // res.end(archive.paths.list);
};

