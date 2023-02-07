const { connectDb, closeConnection } = require("../db/connection");
const mongodb = require("mongodb");


//utility post
let utilityRecharge = async function (req, res) {
    try {
        
         const db = await connectDb();
         await db.collection("utilities").insertOne(req.body);
         res.json({ message: "Payment success" })
         await closeConnection();
      
     } catch (error) {
         res.status(500).json({ message: "Something went wrong" });
         console.log(error);
     }
//     try {
//        if( req.userId === req.params.uId){
//         const db = await connectDb();
//         const utility = await db.collection("utilities")
//         .insertOne({ uId : new mongodb.ObjectId(req.params.uId), ...req.body});
//         res.json({ message: "Payment success" })
//         await closeConnection();
//        }else{
// res.status(401).json({message:"Unauthorized"});
//        }
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong" });
//         console.log(error);
//     }
}

//utility get
let utilityData = async function (req, res) {
    try {
        
         const db = await connectDb();
         const data = await db.collection("utilities").find().toArray();
         await closeConnection();
         res.json(data);

 
     } catch (error) {
         res.status(500).json({ message: "Something went wrong" });
         console.log(error);
 
     }
    // try {
    //    if(req.userId === req.params.uId){
    //     const db = await connectDb();
    //     const data = await db.collection("utilities").find({uId : new mongodb.ObjectId(req.params.uId)}).toArray();
    //     await closeConnection();
    //     res.json(data);
    //    }else{
    //     res.status(401).json({message:"Unauthorized"});

    //    }

    // } catch (error) {
    //     res.status(500).json({ message: "Something went wrong" });
    //     console.log(error);

    // }
}
module.exports = { utilityRecharge , utilityData }