import axios from "axios";

export default {
  // Gets all books
  getTickers: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getTicker: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteTicker: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveTicker: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
