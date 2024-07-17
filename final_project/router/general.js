const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let bookList = [];
    Object.values(books).map((element)=>(
    bookList.push(element["title"])
  ))
  return res.send(JSON.stringify(bookList));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let ISBN  = req.params.isbn;
    if(books[ISBN]){
        return res.send(JSON.stringify(books[ISBN]))
    }else{
        return res.status(300).json({message: "Book doesn't exists with given ISBN"})
    }
   
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let Author  = req.params.author.replace(/[:\\"]/g,'');
    let book =  Object.values(books).filter((element)=>(
        element["author"]===Author
    ))
    if(book.length>0){
        return res.send(JSON.stringify(book))
    }else{
        return res.status(300).json({message: "Book doesn't exists with given author"})
    } 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let Title  = req.params.title.replace(/[:\\"]/g,'');
    let book =  Object.values(books).filter((element)=>(
        element["title"]===Title
    ))
    if(book.length>0){
        return res.send(JSON.stringify(book))
    }else{
        return res.status(300).json({message: "Book doesn't exists with given title"})
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let ISBN  = req.params.isbn;
    if(books[ISBN]){
        if(books[ISBN]["reviews"].length > 0){
            return res.send(JSON.stringify(books[ISBN]))
        }else{
            return res.status(200).json({message: "Book doesn't have reviews available"})
        }
        
    }else{
        return res.status(300).json({message: "Book doesn't exists with given ISBN"})
    }
});

module.exports.general = public_users;
