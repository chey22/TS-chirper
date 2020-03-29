import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';

const Admin: React.FC<AdminProps> = () => {

    const history = useHistory();  
    const { id } = useParams(); //gets the :id value out of url

    const [username, setUsername] = useState<string>("");
    const [message, setMessage] = useState<string>("");
  
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setUsername(e.target.value); // e is a React change event happening on an HTML input element
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setMessage(e.target.value); // e is a React change event happening on an HTML text area element

    useEffect(() => {
        (async () => {
          let res = await fetch(`/api/chirps/${id}`); //fetch that info and set it to state
          let chirp = await res.json();
          setUsername(chirp.username); // prefills with that chirp's username input
          setMessage(chirp.message); // prefills with that chirp's text input
        })(); // anonymous function that immediately invokes itself
      }, [id]); // runs only when the id value changes

      const editChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let res = await fetch(`/api/chirps/${id}`, {
          // customized fetch request with second argument after the url that's an object with a method property of value 'POST' and a headers property
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, message })
        });
        if (res.ok) {
            history.push(`/details/${id}`); // if response status code is ok, push a new path in to details view of the chirp that was edited
        } else {
            console.log('uh oh')
        }
      };

      const deleteChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let res = await fetch(`/api/chirps/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
            history.push('/'); // if response status code is ok, push a new path into history back to home page
        } else {
            console.log('uh oh')
        }
      };
      
    return (
         //gets the :id value out of url
         <main className="container">
         <section className="row my-2 justify-content-center">
           <div className="col-md-8">
             <form className="form-group p-3 shadow border rounded">
               <label htmlFor="username">Username</label>
               <input
                 value={username}
                 onChange={handleUsernameChange}
                 placeholder="Who goes there?"
                 id="username"
                 type="text"
                 className="form-control"
               />
               <label htmlFor="message">Message</label>
               <textarea
                 value={message}
                 onChange={handleMessageChange}
                 rows={6}
                 placeholder="What say you?"
                 className="form-control"
                 id="message"
               />
               <button
                 onClick={editChirp}
                 className="btn btn-outline-primary btn-block mt-3 w-50 mx-auto shadow-sm"
               >
                 Edit Chirp!
               </button>
               <button
                 onClick={deleteChirp}
                 className="btn btn-outline-danger btn-block mt-3 w-50 mx-auto shadow-sm"
               >
                 Delete Chirp!
               </button>
             </form>
           </div>
         </section>
       </main>
};

interface AdminProps {}

export default Admin;