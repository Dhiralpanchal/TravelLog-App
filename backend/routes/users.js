
const jwt = require('jsonwebtoken');
const { Router } = require( "express");
const router = Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

router.post("/register",async(req,res)=>{
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        //create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        });

        //save user and send response
        const user = await newUser.save();
        res.status(200).json(user._id)
    }
    catch(err){
        res.status(500).json(err)
    }
});
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Wrong username" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign({_id:user._id},'ssh');
   

     // Send response
     res.status(200).json({ token,_id: user._id, username: user.username });

     console.log('jwttoken',token);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

