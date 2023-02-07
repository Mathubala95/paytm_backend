const { connectDb, closeConnection } = require("../db/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*user register */
 
 let userRegister = async (req, res ) => {
    try{
      const db = await connectDb();
      const userEmail = await db.collection("users").findOne({email:req.body.email});

      if(!userEmail){
        req.body.createdAt = new Date().toString();
        req.body.role = "USER";
    
      
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;

      const user = await db.collection("users").insertOne(req.body);

      res.json({message : "User added successfully"})
      }else{
        res.status(401).json({message : "Email is already exsist"})

      }
      await closeConnection()
    }catch(error){
      console.log(error)
      res.status(500).json({message : "Something went wrong"})
    
    }}
/*user login */
    let userLogin = async function(req, res) {
        try{
          const db = await connectDb();
          const user = await db.collection("users").findOne({email : req.body.email})
         
          
          if(user && user.role === "USER"){
            const compare = await bcrypt.compare(req.body.password, user.password);
            if(compare){
              const token =jwt.sign({_id : user._id, role : user.role}, process.env.JWT_SECRET, {expiresIn : "24h"});
            //   res.json({
            //     uId : user._id,
            //     token: token,
            //     role: user.role,
            //     name: user.name
            // })
            res.json({token})
            }else{
              res.status(401).json({message : "username / password is incorrect"})
            }
          }else{
            res.status(401).json({message : "username / password is incorrect"})
          }
        
          await closeConnection();
        }catch(error){
          console.log(error)
          res.status(500).json({message : "Something went wrong"})
        }}
 //list user
        let userData = async (req,res) => {
            try {
                let db = await connectDb();
                let data = await db.collection('users').find().toArray();
                res.json(data);
                await closeConnection();
                
            } catch (error) {
                console.log(error)
          res.status(500).json({message : "Internal server error"})
            }
        }
      
    
    module.exports={userRegister,userLogin ,userData}