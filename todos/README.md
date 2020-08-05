# testing with mocha

## Credits
https://www.digitalocean.com/community/tutorials/how-to-test-a-node-js-module-with-mocha-and-assert

## Using node.js REPL to do manual test
```
$ node
> const Todos = require('./index');
> const todos = new Todos();
> todos.add("run code");
> todos.list();
> todos.add("test everything");
> todos.complete("run code");
> todos.list();
> .exit
```

## Using mocha to test

### load todo module and Node's assert module 
const Todos = require('./index');
const assert = require('assert').strict;

### basic mocha template
describe([String with Test Group Name], function() {
    it([String with Test Name], function() {
        [Test Code]
    });
});

describe - group similar tests
it - contains test code

### assert module functions
assert.notStrictEqual(<value to test>, <value expected>)
  if both arguments are the same, throws error
assert.strictEqual(<value to test>, <value expected>)
  checks for equality - fail if not exactly the same
assert.deepStrictEqual(todos.list(), [{title: "run code", completed: false}])
  recursively test that expected and actual objects have same properties