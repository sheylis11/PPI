const test = require('node:test');
const assert = require('node:assert/strict');
const User = require('../models/User');

test('permite crear y recuperar usuarios incluso sin conexión a MongoDB', async () => {
  const created = await User.create({
    name: 'Ana Test',
    email: 'ana@test.com',
    passwordHash: 'hash-demo'
  });

  const found = await User.findOne({ email: 'ana@test.com' });

  assert.ok(created);
  assert.equal(created.email, 'ana@test.com');
  assert.equal(found.email, 'ana@test.com');
  assert.equal(found.passwordHash, 'hash-demo');
});
