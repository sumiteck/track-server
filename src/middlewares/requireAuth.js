const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = require("../routes/authRoutes");
const User = mongoose.model("User");
 
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
 
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }
 
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in." });
    }
 
    const { userId } = payload;

    const user = await User.findById(userId);
    console.log(user)
 
    req.user = user;
    next();
  });

  router.post("/signin", async (req, res) => {
    const {email, password    } = req.body;
    if(!email || !password) {
        return res.status(422).send({error: "must provide email and password"});
    }
    const user = await User.findOne({email});
    if(!user) {
        return res.status(422).send({error: "Email is not found "});
    }

    

    try{
       
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
    
        res.send({token});
       }catch(err) {
           return res.status(422).send({error: "Invalid email or Password"});
       }
  });
};