import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NavBar from './NavBar';

const Recommender = () => {

  const [books, setBooks] = useState()
  const [searchParam, setSeacrhParam] = useState("")
  const [isbn, setISBN] = useState()

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(searchParam)
    await axios.get(`https://openlibrary.org/search.json?q=${searchParam}`)
      .then((response) => {
        console.log(response.data.docs[0].isbn[0])
        setBooks(response.data.docs)
        console.log(books)
      })
      .catch((error) => {
        alert("Error While Making Query")
        console.log(error.message)
      })
  }


  const printBook = (book) => {
  
    return (
      book.hasOwnProperty("isbn") ? (
        <div>
          <h3>{book.title}</h3>
          <p>Ratings : {book.ratings_average}</p>
          <p>Author Name : {book.author_name}</p>
          <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`} />
        </div>
      ) : null

    )
  };


  if (!books) {
    return (

      <>
        <NavBar />
        <div className="recommender--outer-div">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search.."
              onChange={ev => setSeacrhParam(ev.target.value)}
              value={searchParam}
            ></input>
            <div >Enter Book Name to Search Books ... </div>
          </form>
        </div>

      </>
    )
  }

  return (
    <div>
      <NavBar />
      <div className="recommender--outer-div">
        {/* <h2>Vote for your favourite books !! 📖📕</h2> */}
        {/* <h3>Books with highest votes will be selected for Reading Book Seva Satva Course.</h3> */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Books Here.."
            onChange={ev => setSeacrhParam(ev.target.value)}
            value={searchParam}
          ></input>
        </form>
      </div>

      <div className='recommender--inner-div'>
        {books ? (
          <ul className='recommender--ul'>
            {books.map((book, i) => (
              <div
                className='recommender--ul-div'
                key={i}>
                {printBook(book)}
              </div>
            ))}
          </ul>
        )
          : (
            <div>Loading...</div>
          )}

      </div>
    </div >
  )
}

export default Recommender
