var fs = require('fs');
var package = require('./package.json');
var angular = require('./node_modules/@angular/common/package.json');
var cli = require('./node_modules/@angular/cli/package.json');

var buildInfo = {
  build: process.env.TRAVIS_BUILD_NUMBER,
  commit: process.env.TRAVIS_COMMIT,
  datetime: (new Date()).toISOString(),
  version: package.version,
  angular: angular.version,
  cli: cli.version
};

fs.writeFile("public/build.json", JSON.stringify(buildInfo), function(err) {
  if(err) {
    return console.log(err);
  }
});
