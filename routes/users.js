var express = require('express');
var router = express.Router();


var User = require("../models/user");



/* GET users listing. */
router.get('/', function (req, res) {
  res.json({ status: "OK", msg: "User Running..." });
});


// 3. Get user details api with token and Email
router.post('/getUserDetailsByEmail', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, details) {
    if (err) {
      res.json({ "status": "ERROR", "msg": "User not found" })
    } else {
      res.json({
        "status": "OK",
        "msg": "User details fetch successfully",
        "data": details
      });
    }
  })
})

// 4. Update user details api with token and userId
router.post('/updateUserDetails', function (req, res) {

  User.findOneAndUpdate({ _id: req.body.userId },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNo: req.body.mobileNo,
        address: req.body.address,
        email: req.body.email
      }
    },
    { new: true },
    function (error, updatedUser) {
      if (error) {
        res.json({ "status": "ERROR", "msg": "Error in updating " });
      } else {
        res.json({ "status": "OK", "msg": "User updated successfully ", "data": updatedUser });
      }
    })
})



module.exports = router;
