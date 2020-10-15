const express = require('express')
const db = require('../data/dbConfig')

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const accounts = await db.select("*").from("accounts")
        res.json(accounts)
    }
    catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const newAccount = { name: req.body.name, budget: req.body.budget}
        await db.insert(newAccount).into("accounts")
        res.json(newAccount)
    }
    catch (err) {
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedAccount = { name: req.body.name, budget: req.body.budget}
        await db.update(updatedAccount).into("accounts").where("id", id)
        res.json(updatedAccount)
    }
    catch(err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        await db("accounts").where("id", id).del()
        res.status(204).end()
    }
    catch(err) {
        next(err)
    }
})

module.exports = router