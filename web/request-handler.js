var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if (req.method === 'POST') {
    var buffer = '';
    req.on('data', (chunk) => {
      buffer += chunk;
   
    }).on('end', () => {
      let exampleUrl = buffer.slice(4);
      
      fs.appendFileSync(archive.paths.list, exampleUrl + '\n');

      archive.isUrlArchived(exampleUrl, (isArchived) => {
        console.log('TRUTHY?', isArchived);
        if (isArchived) {
          fs.readFile(archive.paths.archivedSites + '/' + exampleUrl, 'utf-8', (err, html) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
          });
          
          
        } else {
          archive.downloadUrls([exampleUrl]);
          fs.readFile(archive.paths.siteAssets + '/' + 'loading.html', 'utf-8', (err, html) => {
            res.writeHead(302, {'Content-Type': 'text/html'});
            res.end(html);
      
          });
        }
      });
      
  
      // fs.appendFileSync(archive.paths.list, exampleUrl + '\n');
      // res.writeHeader(302, { 'Content-Type': 'text/html' });
      // res.end();
      
    });
    
  } else if (req.url === '/' && req.method === 'GET') {
    fs.readFile(__dirname + '/public/index.html', (err, html) => {
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html, 'utf-8');
    });
  } else {
    fs.readFile(archive.paths.archivedSites + req.url, (err, html) => {
      
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html, 'utf-8');
    });
    
  }
  // res.end(archive.paths.list);
};

