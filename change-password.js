
require('dotenv').config();

const bcrypt = require('bcrypt');
const db = require('./config/db');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your registered Campus Eats email: ', (email) => {
  rl.question('Enter your new password: ', async (password) => {
    try {
      if (!email.trim() || !password || password.length < 6) {
        console.log('Enter a valid email and a password of at least 6 characters.');
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const result = await db.result(
        `UPDATE users
         SET password_hash = $1
         WHERE LOWER(email) = LOWER($2)`,
        [passwordHash, email.trim()]
      );

      if (result.rowCount === 0) {
        console.log('No account found with that email.');
      } else {
        console.log('Your Campus Eats password has been changed.');
      }
    } catch (error) {
      console.error('Password update failed:', error.message);
    } finally {
      rl.close();
      await db.$pool.end();
    }
  });
});