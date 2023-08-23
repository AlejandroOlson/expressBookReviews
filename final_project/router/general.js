const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



// Get the book list available in the shop
public_users.get('/',function (req, res) {
   res.send(JSON.stringify(books, null, 4));
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 200);
  });

  myPromise.then(success => {
    res.status(200).json(success);
  }).catch(err => {
    res.status(200).json({ message: "An error has occurred"});
  });

});





// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
   const isbn = req.params.isbn;
   res.send(books[isbn]);
 });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    setTimeout(() => {
      resolve(books[isbn]);
    }, 200);
  });

  myPromise.then(success => {
    res.status(200).json(success);
  }).catch(err => {
    res.status(200).json({ message: "An error has occurred"});
  });

});




  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const keys = Object.keys(books);
  for (let key of keys) {
    if (books[key].author === author) {
      res.send(books[key]);
    }
  }
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    const author = req.params.author;
    const keys = Object.keys(books);
    for (let key of keys) {
      if (books[key].author === author) {
        setTimeout(() => {
          resolve(books[key]);
        }, 200);
      }
    }
    
  });

  myPromise.then(success => {
    res.status(200).json(success);
  }).catch(err => {
    res.status(200).json({ message: "An error has occurred"});
  });
});




// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const keys = Object.keys(books);
  for (let key of keys) {
    if (books[key].title === title) {
      res.send(books[key]);
    }
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    const title = req.params.title;
    const keys = Object.keys(books);
    for (let key of keys) {
      if (books[key].title === title) {
        setTimeout(() => {
          resolve(books[key]);
        }, 200);
      }
    }
    
  });

  myPromise.then(success => {
    res.status(200).json(success);
  }).catch(err => {
    res.status(200).json({ message: "An error has occurred"});
  });
  
});





//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});


module.exports.general = public_users;
