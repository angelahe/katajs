# Simple Katas for code problems
This project is to practice basic problem solving as katas

## templates
atemplate.html
atemplate.js
atemplateTest.js

## setup environment
npm init
sudo npm install --save-dev mocha
mkdir test
-- create test.js

## to run the tests
```
$ ./node_modules/mocha/bin/mocha

```
## setup test script in package.json
```
"scripts": {
      "test": "mocha -name '*test.js' --recursive"
    },
```

## then run tests with npm test

## reference resources
https://www.digitalocean.com/community/tutorials/how-to-use-node-js-modules-with-npm-and-package-json

https://mochajs.org/#installation


## next to read
https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js

https://www.digitalocean.com/community/conceptual_articles/understanding-this-bind-call-and-apply-in-javascript

https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module

https://mochajs.org/#installation

https://vanillajstoolkit.com/boilerplates/#Revealing-Module-Pattern

node.js
mochajs.org

## notes on node
npm init
npm ls            - list dependencies
npm ls --depth 0  - list dependencies at top of tree 
npm outdated
npm install
npm audit         - for known security flaws
npm update
npm uninstall