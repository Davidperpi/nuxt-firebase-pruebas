import { db } from './firebase'
const { Router } = require('express')
const router = Router()


router.use('/hello', (req, res) => {
    console.log('body', req.body)
    console.log(req.params.idio_nombre)
    try {
        let users = []
        let starCountRef = db.ref("users/");
        starCountRef.on("value", (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                users = data;
                console.log(users);
            }
            res.end(JSON.stringify(users))
        });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router