const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    const User = users.filter((user)=>(
        user.username===username
    ))
    if(User.length>0){
        return true;
    }
    return false;
}

const authenticatedUser = (username,password)=>{ 
    if(isValid(username)){
        const User = users.filter((user)=>(
            user.username===username && user.password === password
        ))
        if(User.length>0){
            return true;
        }
    }
 
    return false;
}


//only registered users can login
regd_users.post("/login", (req,res) => {
    const Username = req.body.username;
    const Password = req.body.password;
    if(!Username || !Password){
        return res.status(404).json({message: "Username or password is empty string"});
    }else{
        if(authenticatedUser(Username, Password)){
            let accessToken  = jwt.sign({
                data: Password
            }, 'access', { expiresIn: 60 * 60 });

            req.session.authorization = {
                accessToken, Username
            }
            return res.status(200).send("User successfully logged in");
        } else {
            return res.status(208).json({ message: "Invalid Login. Check username and password" });
        }
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
