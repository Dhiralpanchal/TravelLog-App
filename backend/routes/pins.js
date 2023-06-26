const { Router } = require( "express");
const router = Router();
const Pin = require('../models/Pin');

//add pins
router.post("/", async (req,res)=>{
    const newPin = new Pin(req.body);
    try{

        const savedPin = await newPin.save();
        res.status(200).json(savedPin)
    }
    catch(err){
        res.status(500).json(err)
    }
});

router.get("/",async (req,res) => {
    try{
        
        const pins = await Pin.find();
        res.status(200).json(pins);
    }
    catch(err) 
    {
        res.status(500).json(err)
    }
});



router.post('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const existingPin = await Pin.findById(id);

    if (existingPin) {
      existingPin.title = req.body.title;
      existingPin.description = req.body.description;
      existingPin.rating = req.body.rating;

      const updatedPin = await existingPin.save();
      res.status(200).json(updatedPin);
    } else {
      res.status(404).json({ error: 'Pin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;

