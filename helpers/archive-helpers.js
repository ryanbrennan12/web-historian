var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var archive = require('../helpers/archive-helpers');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  
  fs.readFile(archive.paths.list, 'utf-8', (err, data) => {
 
    
    callback(data.split('\n'));

  });

};

exports.isUrlInList = function(url, callback) {

  this.readListOfUrls((arr) => {
    // console.log('list: ', arr);
    callback(arr.includes(url));
  });

};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(archive.paths.list, url, 'utf-8', callback);
};
/////////


exports.isUrlArchived = function(url, callback) {
  // console.log('this is the path: ', archive.paths.archivedSites);
  // console.log('this URL: ', url);
  fs.readFile(archive.paths.archivedSites + '/' + url, (err) => {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });

};

exports.downloadUrls = function(urls) {
};
