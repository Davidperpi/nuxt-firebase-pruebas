import { db } from './firebase'
const { Router } = require('express')
const rout = Router()

rout.use('/ball/get', (req, res) => {
    let dbRef = db.ref("balls/");
    dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            res.end(JSON.stringify(snapshot.val()))
        } else {
            console.log("No data available")
        }
    }).catch((error) => {
        console.error(error)
        res.end(JSON.stringify({ ok: false }))
    })
})

rout.use('/ball/filter', (req, res) => {
    const filter = req.body
    let dbRef = db.ref("balls/");
    dbRef.orderByChild(filter.type).startAt(filter.name).get().then((snapshot) => {
        if (snapshot.exists()) {
            res.end(JSON.stringify(snapshot.val()))
        } else {
            console.log("No data available")
            res.end(JSON.stringify({ ok: false }))
        }
    }).catch((error) => {
        console.error(error)
        res.end(JSON.stringify({ ok: false }))
    })
})

rout.use('/ball/post', (req, res) => {
    const ball = req.body
    if (Object.keys(ball).length === 0) {
        res.end(JSON.stringify({ ok: false }))
    }
    let newUserKey = db.ref().child("balls").push().key;
    ball.id = newUserKey;
    db.ref("balls/" + ball.id).set(ball)
        .then(() => {
            res.end(JSON.stringify({ ok: true }))
        })
        .catch((error) => {
            console.log(error)
            res.end(JSON.stringify({ ok: false }))
        })
})

rout.use('/ball/put', (req, res) => {
    const ball = req.body
    if (Object.keys(ball).length === 0) {
        res.end(JSON.stringify({ ok: false }))
    }
    db.ref("balls/" + ball.id).update(ball)
        .then(() => {
            res.end(JSON.stringify({ ok: true }))
        })
        .catch((error) => {
            console.log(error)
            res.end(JSON.stringify({ ok: false }))
        })
})

rout.use('/ball/delete', (req, res) => {
    const ball = req.body
    if (Object.keys(ball).length === 0) {
        res.end(JSON.stringify({ ok: false }))
    }
    db.ref('balls/' + ball.id).remove()
        .then(() => {
            res.end(JSON.stringify({ ok: true }))
        })
        .catch((error) => {
            console.log(error)
            res.end(JSON.stringify({ ok: false }))
        })
})

module.exports = rout