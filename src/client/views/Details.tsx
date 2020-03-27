import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { IChirp } from "../utils/types";

const Details: React.FC<DetailsProps> = () => {
  const { id } = useParams(); //gets the :id value out of url
  const history = useHistory(); // used in Button to go back a page

  const [chirp, setChirp] = useState<IChirp>(null); // to satisfy TypeScript, leave blank (null) for initial value until it fetches the info. Will have to account for the null with optional chaining when rendering in the card. Could use a blank object instead of null, but would have to add all default values with '' as blank strings to make sure it matches the interfaces defined properties

  useEffect(() => {
    (async () => {
      let res = await fetch(`/api/chirps/${id}`); //fetch that info and set it to state
      let chirp = await res.json();
      setChirp(chirp);
    })(); // anonymous function that immediately invokes itself
  }, [id]); // runs only when the id value changes

  return (
    // gets the :id value out of url
    <div>
      <main className="container">
        <section className="row my-2 justify-content-center">
          <div className="col-md-12">
            <div className="card shadow">
              <div className="card-body text-center">
                <h4 className="card-title">@{chirp?.username}</h4>
                {/* optional chaining (aka conditional rendering) - means that if chirp is null, it is false and will skip .username. But if chirp is true and vas a value, then render .username :) Same principle below with chirp?.message and chirp?.id */}
                <p className="card-text">{chirp?.message}</p>
                <div className="d-flex justify-content-end align-items-center">
                    <button onClick={() => history.goBack()} className="btn btn-sm btn-outline-primary mx-1">Go Back</button>
                    <Link className="btn btn-sm btn-outline-dark mx-1" to={`/admin/${chirp?.id}`}>Edit</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

interface DetailsProps {}

export default Details;
