const express = require('express')
const Memo = require('../model/memo')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/memo', async (req, res) => {
    //console.log(req);
    const memo = new Memo({
        ...req.body,
        owner: req.user._id
    })
    try {
        await memo.save()
        res.status(201).send(memo)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/memo', auth, async (req, res) => {
    try {
        const memo = await Memo.find({})
        if (!memo) {
            return res.status(404).send()
        }
        res.send(memo)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/memo/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const memo = await Memo.findOne({_id})

        if (!memo) {
            return res.status(404).send()
        }

        res.send(memo)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/memo/', auth, async (req, res) => {
    try {
        const memo = await Memo.remove()
       
        if (!memo) {
            res.status(404).send()
        }

        res.send(memo)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/memo/:id', auth, async (req, res) => {
    try {
        const memo = await Memo.findOneAndDelete({_id:req.params.id})
       
        if (!memo) {
            res.status(404).send()
        }

        res.send(memo)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/memo/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    // const allowedUpdates = ['description', 'completed']
    // const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // if (!isValidOperation) {
    //     return res.status(400).send({ error: 'Invalid updates!' })
    // }
    try {
        
        const memo = await Memo.findById({_id:req.params.id})

        if (!memo) {
            return res.status(404).send()
        }

        updates.forEach((update) => memo[update] = req.body[update])
        await memo.save()

        res.send(memo)
    } catch (e) {
        res.status(400).send(e)
        
    }
})

module.exports = router