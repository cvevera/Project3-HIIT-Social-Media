const db = require("../models");
const { verify } = require("jsonwebtoken");
const { createAccessToken, createRefreshToken, sendRefreshToken, sendAccessToken } = require("../auth/tokens");

module.exports = {
	// Find user and authenticate
	findUser: function(req, res) {
		console.log(req.body);
		//checks that email is present or not
		db.User.findOne({ email: req.body.email }, (err, user) => {
			// console.log(user)
			if (!user) {
				res.json({ message: "Login failed, user not found" });
				return;
			}
			// If email is found then it will compare password
			user.comparePassword(req.body.password, (err, isMatch) => {
				if (err) throw err;
				if (!isMatch)
					return res.status(400).json({
						message: "Wrong Password"
					});

				const accesstoken = createAccessToken(user._id);
				const refreshtoken = createRefreshToken(user._id);
				let userData;

				// Store Refreshtoken with user in "db"
				user.token = refreshtoken;
				user.save((err, user) => {
					if (err) res.status(400).send(err);

					//Send token. Refreshtoken as a cookie and accesstoken as a regular response
					userData = user.filterUserData();
					userData.age = user.calculateAge();
					userData.accessToken = accesstoken;
					sendRefreshToken(res, refreshtoken);
					sendAccessToken(res, req, userData);
				});
			});
		});
	},

	// Update user profile into DB
	updateUser: function(req, res) {
		const userId = req.body.userId;
		const userData = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			birthday: req.body.birthday,
			gender: req.body.gender,
			box: req.body.box
		};
		let heightObj = { height: req.body.height, date: new Date() };
		let weightObj = { weight: req.body.weight, date: new Date() };

		db.User.findByIdAndUpdate(userId, userData, { new: true }, function(err, dbUser) {
			if (err) {
				res.status(500).send({ message: "Error in updating user data" });
				return;
			}
			db.User.findByIdAndUpdate(
				userId,
				{ $push: { height: { $each: [heightObj], $position: 0 }, weight: { $each: [weightObj], $position: 0 } } },
				{ new: true },
				function(err, dbUser) {
					if (err) {
						res.status(500).send({ message: "Error in updating user data" });
						return;
					}
					userFilteredData = dbUser.filterUserData();
					userFilteredData.age = dbUser.calculateAge();
					res.status(200).send(userFilteredData);
				}
			);
		});
	},

	updateStats: function(req, res) {
		let statUpdateObj = {};
		const updateArray = req.body.filteredDataArray;
		// console.log(updateArray);

		updateArray.forEach(element => {
			var name = Object.keys(element);
			var objAdd = {};
			objAdd[name[0]] = element[name];
			objAdd.date = new Date();
			statUpdateObj[name[0]] = { $each: [objAdd], $position: 0 };
		});
		// console.log(statUpdateObj);
		const userId = req.body.userId;

		db.User.findByIdAndUpdate(userId, { $push: statUpdateObj }, { new: true }, function(err, dbUser) {
			if (err) {
				res.status(500).send({ message: "Error in updating user data" });
				return;
			}
			userFilteredData = dbUser.filterUserData();
			userFilteredData.age = dbUser.calculateAge();
			res.status(200).send(userFilteredData);
		});
	},

	getAllMembers: function(req, res) {
		let membersFilteredArray = [];
		db.User.find({}, function(err, dbMembers) {
			if (err) {
				res.status(500).send({ message: "Error in finding members" });
				return;
			}
			dbMembers.forEach(element => {
				filteredMember = element.filterUserData();
				filteredMember.age = element.calculateAge();
				membersFilteredArray.push(filteredMember);
			});
			res.status(200).send(membersFilteredArray);
		});
	},

	// Save new user to DB
	create: function(req, res) {
		const user = new db.User({
			email: req.body.email,
			password: req.body.password
		}).save((err, response) => {
			if (err) res.status(400).send(err);
			res.status(200).send(response);
		});
	},

	// Logout user
	logoutUser: function(req, res) {
		// Clear cookie
		res.clearCookie("refreshtoken", { path: "/refresh_token" });

		//Remove refreshtoken from db
		db.User.findByIdAndUpdate(req.body.userId, { $set: { token: "" } }, function(err, dbUser) {
			if (err) {
				res.status(500).send({ message: "Error in updating user data" });
				return;
			}
			return res.send({
				message: "Logged out"
			});
		});
	},

	// Request all WOD from DB
	findWods: function(req, res) {
		db.Wod.find()
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	// Get a new access token with a refresh token
	getNewToken: (req, res) => {
		const token = req.cookies.refreshtoken;
		console.log("TOKEN: ", token);
		// If we don't have a token in our request
		if (!token) return res.send({ accesstoken: "" });
		// We have a token, let's verify it!
		let payload = null;
		try {
			payload = verify(token, process.env.REFRESH_TOKEN);
		} catch (err) {
			return res.send({ accesstoken: "" });
		}
		console.log(payload.userId);
		// token is valid, check if user exist
		// const user = db.User.find(user => user.id === payload.userId);

		db.User.findById(payload.userId, function(err, user) {
			if (err) {
				return res.send({ accesstoken: "" });
			}
			// user exist, check if token exist on user
			if (user.token !== token) return res.send({ accesstoken: "" });
			// token exist, create new Refresh- and accesstoken
			const accesstoken = createAccessToken(user._id);
			const refreshtoken = createRefreshToken(user._id);
			// update refreshtoken on user in db
			// Could have different versions instead!
			user.token = refreshtoken;
			user.save((err, user) => {
				if (err) res.status(400).send(err);
				sendRefreshToken(res, refreshtoken);
				return res.send({ accesstoken });
			});
		});
	}
};
