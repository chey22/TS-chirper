import * as React from "react";
import { IChirp } from "../utils/types";
import { useHistory } from "react-router-dom"; // replaces Link to so that the card is clickable instead of a link

const HomeChirpCard: React.FC<HomeChirpCardProps> = props => {
  // a React functional component that will receive HomeChirpCard props

  const history = useHistory(); // gives access to the history prop from BrowserRouter

  return (
    <div className="col-md-6 mx-1">
      <div
        onClick={() => history.push(`/details/${props.chirp.id}`)}
        className="card my-2 shadow">
        <div className="card-body text-center">
          <h4 className="card-title">@{props.chirp.username}</h4>
          <p className="card-text">{props.chirp.message}</p>
          {/* <Link to={`/details/${props.chirp.id}`}>Get Details</Link> */}
        </div>
      </div>
    </div>
  );
};

interface HomeChirpCardProps {
  chirp: IChirp;
}

export default HomeChirpCard;
