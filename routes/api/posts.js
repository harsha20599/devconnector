const express = require('express');
const router = express.Router();


// @Route   GET api/posts/test
// @desc    Tests post route
// @access  public 
router.get('/test', (req,res) => {
    res.json({
        msg : "post Works"
    });
});

module.exports = router;