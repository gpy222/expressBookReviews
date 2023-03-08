const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
  });

// Promise Code
const getAllBooks = () => Promise.resolve(books);
const getByISBN = (isbn) => Promise.resolve(books[isbn]);
const getByAuthor = (author) => Promise.resolve(Object.values(books).filter((book) => book.author === author));
const getByTitle = (title) => Promise.resolve(Object.values(books).filter((book) => book.title === title));


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  getAllBooks()
  .then(result => res.status(200).send(JSON.stringify(result,null,4)))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    getByISBN(req.params.isbn)
    .then(result => res.status(200).send(JSON.stringify(result,null,4)))
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    getByAuthor(req.params.author)
    .then(result => res.status(200).send(JSON.stringify(result,null,4)))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    getByTitle(req.params.title)
    .then(result => res.status(200).send(JSON.stringify(result,null,4)))
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
const isbn = req.params.isbn;
res.send(books[isbn]['reviews']);
});

module.exports.general = public_users;
