const test = require('node:test');
const assert = require('node:assert/strict');
const { createUser, findUserByEmail } = require('../services/userStore');

test('crea y encuentra usuarios en memoria', async () => {
  const user = await createUser({
    name: 'Ana Test',
    email: 'ana@test.com',
    passwordHash: 'hash-demo'
  });

  const found = await findUserByEmail('ana@test.com');

  assert.ok(user);
  assert.equal(user.email, 'ana@test.com');
  assert.equal(found.email, 'ana@test.com');
  assert.equal(found.passwordHash, 'hash-demo');
});
