const express = require("express");

const db = require("../data/dbConfig.js");
const accountsRouter = require ('../accounts/accounts')

const server = express();

server.use(express.json());
server.use(accountsRouter);

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server;
