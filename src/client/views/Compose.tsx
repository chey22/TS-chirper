import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
const Compose: React.FC<ComposeProps> = () => {

  const history = useHistory();  
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value); // e is a React change event happening on an HTML input element
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMessage(e.target.value); // e is a React change event happening on an HTML text area element

  const fireChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let res = await fetch("/api/chirps", {
      // customized fetch request with second argument after the url that's an object with a method property of value 'POST' and a headers property
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, message })
    });
    if (res.ok) {
        history.push('/'); // if response status code is ok, push a new pach into history back to home page
    } else {
        console.log('uh oh')
    }
  };
  return (
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
              onClick={fireChirp}
              className="btn btn-outline-primary btn-block mt-3 w-50 mx-auto shadow-sm"
            >
              Fire Chirp!
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

interface ComposeProps {}

export default Compose;
