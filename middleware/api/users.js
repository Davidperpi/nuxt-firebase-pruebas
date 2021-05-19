import { db } from './firebase'
const { Router } = require('express')
const router = Router()

router.use('/user/get', (req, res) => {
    let dbRef = db.ref("users/");
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

router.use('/user/filter', (req, res) => {
    const filter = req.body
    let dbRef = db.ref("users/");
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

router.use('/user/post', (req, res) => {
    const user = req.body
    if (Object.keys(user).length === 0) {
        res.end(JSON.stringify({ ok: false }))
    }
    db.ref("users/" + user.username).set(user)
        .then(() => {
            res.end(JSON.stringify({ ok: true }))
        })
        .catch((error) => {
            console.log(error)
            res.end(JSON.stringify({ ok: false }))
        })
})

router.use('/user/put', (req, res) => {
    const user = req.body
    if (Object.keys(user).length === 0) {
        res.end(JSON.stringify({ ok: false }))
    }
    db.ref("users/" + user.username).update(user)
        .then(() => {
            res.end(JSON.stringify({ ok: true }))
        })
        .catch((error) => {
            console.log(error)
            res.end(JSON.stringify({ ok: false }))
        })
})

router.use('/user/delete', (req, res) => {
    const user = req.body
    if (Object.keys(user).length === 0) {
        res.end(JSON.stringify({ ok: false }))
    }
    db.ref('users/' + user.username).remove()
        .then(() => {
            res.end(JSON.stringify({ ok: true }))
        })
        .catch((error) => {
            console.log(error)
            res.end(JSON.stringify({ ok: false }))
        })
})

module.exports = router