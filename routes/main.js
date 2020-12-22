const express = require('express');
const router = express.Router();
const data = require('../data.json')

// get all items
router.get('/main-data', async (req, res) => {
    res.send(data);
});

// get item by id
router.get('/get-item/:id', async (req, res) => {
    const item = data.results.find(el => el.imdbID === req.params.id)
    res.send(item);
});

// update item
router.post('/update-item/:id', async (req, res) => {
    const index = data.results.findIndex(el => el.imdbID === req.params.id); // get index of the item to update
    data.results[index].Title = req.body.Title; // actual update

    res.send({ success: true, newTitle: data.results[index].Title })

})


module.exports = router;