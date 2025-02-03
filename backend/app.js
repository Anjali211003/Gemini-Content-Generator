require("dotenv").config();
const express=require("express");
const cors=require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

//!Express instance
const app=express();
//!Middlewares
const corsOptions={
     origin:["http://localhost:5174","http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());
const apiKey = process.env.API_KEY; 
const genAI = new GoogleGenerativeAI(apiKey);


app.post("/generate", async(req,res)=>{
    const {prompt}=req.body;
     try{
         
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
           
            const result = await model.generateContent(prompt);
            const response= await result.response;
            const text=response.text();
            res.send(text);
           
            }
     
     catch (error){
        console.log(error);
          res.status(500).send("Failed to generate content");
     }
});

app.listen(8080, console.log("Server is running"));


