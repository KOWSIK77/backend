const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require('crypto-js')

//register
router.post("/register", async (req, res) => {
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password:  CryptoJS.AES.encrypt(JSON.stringify(req.body.password), process.env.PASS).toString(),
  });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser); 
  } catch (error) {
    res.status(500).json(error);
  }
});

//login

router.post('/login',async(req,res)=>{
 try {
   const user = await User.findOne({username:req.body.username})

    !user && res.status(401).json('wrong credential')

   const bytes  = CryptoJS.AES.decrypt(user.password, process.env.PASS);
const  originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText)
console.log(req.body.password)

   originalText !== req.body.password && res.status(401).json('wrong credential pass')
res.status(200).json(user)
 } catch (error) {
  res.status(500).json(error)
 }
}) 
module.exports = router;
