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
assert.throws(<function that has the code that throws the error>, <expected error string>)
  verify errors are thrown as expected

### asynchronous tests with callbacks
it("should save a single TODO", function(done) {
  done() callback to know the function completed
assert.strictEqual(fs.existsSync('todos.csv'), true);
  assert the file exists, returns true if file path in its argument exists, false otherwise
readFileSync() - to read the file synchronously
  end the test with call to done() callback, so Mocha knows to stop testing that case
done(err); 
  fail the test if an error occurred
  
## side note
fs module functions are asyncronous by default, but have synchronous counterparts
that end with Sync in their name
readFileSync returns a buffer object (binary data) so use toString so can compare