const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=> { //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=> { //returns boolean
  let validusers = users.filter((user)=> {
    return (user.username === username && user.password === password) 
  });

  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error, cannot log in"})
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60*60 });

    req.session.authorization = {
      accessToken,username
    }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid login."})
  }

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const reviewAdded = Object.keys(req.body);
  const keys = Object.keys(books);
  let foundISBN = false;

  for (let key of keys) {
    if (key === isbn) {
      for (let review of reviewAdded) {
        books[key].reviews[key] = reviewAdded[review];
        res.status(200).json({ message: `Success! The following review was added ${reviewAdded} to ISBN number ${isbn}`});
        foundISBN = true;
        break;
      }
    }
  }
  
  if (!foundISBN) { 
    res.status(404).json({ message: `ISBN ${isbn} not found`});
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const reviewAdded = Object.keys(req.body);
  const keys = Object.keys(books);
  let foundISBN = false;

  for (let key of keys) {
    if (key === isbn) {
      for (let review of reviewAdded) {
        delete reviewAdded[review];
        res.status(200).json({ message: `Success! The following review was deleted: ${reviewAdded} from ISBN number ${isbn}`});
        foundISBN = true;
        break;
      }
    }
  }
  
  if (!foundISBN) { 
    res.status(404).json({ message: `ISBN ${isbn} not found`});
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
