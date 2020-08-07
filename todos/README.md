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
see package.json to specify the test file location
```
npm test
```
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

### asynchronous tests with promises (more prevalent)
const fs = require('fs').promises;
remove done() callback from arguments in it
to test promise, put assertion code in the then() function
we don't have a catch() function for if the promise is rejected, and mocha can detect when a promise is reqjected and if so, automatically fails the test
use return on the promise being tested

### use promises with async/await to keep less verbose
result - not have to create multiple then functions to handle successful results
after use async keyword - can get any future results with await keyword
can then use promises without having to use then() or catch() functions

### use hooks to improve test cases
config environment before and after a test
add within a describe() function block
  before - once before the first test begins
  beforeEach - run before every test case
  after - once after the last test case is complete
  afterEach - run after every test case

add beforeEach to the test block
switch reference to this
cleanup after every test with afterEach

### dynamically generate tests
function add() {
  return Array.prototype.slice.call(arguments).reduce(function (prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function () {
  var tests = [
    {args: [1, 2], expected: 3},
    {args: [1, 2, 3], expected: 6},
    {args: [1, 2, 3, 4], expected: 10},
  ];

  tests.forEach(function (test) {
    it('correctly adds ' + test.args.length + ' args', function () {
      var res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});

### stub out tests and mark as pending
describe("bowling: ", function() {
  it.skip("should be able to ", function() {
    
  });
});