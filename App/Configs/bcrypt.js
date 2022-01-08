
const bcrypt = require("bcryptjs");



const bcryptPW = (password) =>
{
  bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(
			password,salt,(err,hash //hash là chuổi paword được băm
			) => {
				if (err) throw err;
				passwordHash = hash;
				return passwordHash
			}
		);
	});
}

module.exports = {
  bcryptPW : bcryptPW
}