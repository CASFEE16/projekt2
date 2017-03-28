var fs = require('fs');
var package = require('./package.json');
var angular = require('./node_modules/@angular/common/package.json');
var cli = require('./node_modules/@angular/cli/package.json');

var buildInfo = {
  build: (process.env.TRAVIS_BUILD_NUMBER ? process.env.TRAVIS_BUILD_NUMBER : 0),
  commit: process.env.TRAVIS_COMMIT,
  datetime: (new Date()).toISOString(),
  version: package.version,
  angular: angular.version,
  cli: cli.version
};

var destDir = 'public';

if (process.env.TRAVIS_BUILD_NUMBER) {
  console.log(process.env.TRAVIS_BUILD_NUMBER);
  destDir = 'dist';
}

var destFile = destDir + '/build.json';
console.log(destFile);

fs.writeFile(destFile, JSON.stringify(buildInfo), function(err) {
  if(err) {
    console.log(err);
  }
});

console.log(buildInfo);

//fs.readFile(destFile, {}, function(error, data) {
//  console.log(JSON.parse(data));
//});
