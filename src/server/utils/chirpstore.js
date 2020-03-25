// pulls in file system opject
const fs = require("fs");

// creates default chirps list to keep track of all chirps
let chirps = { nextid: 0 };

// when this file runs, "exists" checks if there is already file chirps.json file
if (fs.existsSync("chirps.json")) {
  chirps = JSON.parse(fs.readFileSync("chirps.json")); // if yes, need to read that file in & set chirps = what's in that file rather than the default state^
}

// use methods from routes
// Doesn't pass in anything and returns all of the chirps
let getChirps = () => {
  // creates a COPY and return it so that whoever gets it can't manipulate the chirps without calling another method
  return Object.assign({}, chirps);
};

// passes an id to getChirp
let getChirp = id => {
  // creates a copy of that one particular chirp and returns it
  return Object.assign({}, chirps[id]);
};

// passes in a chirp; lets you access properties on an object kind of like an array even though it's an object
let createChirp = chirp => {
  // creates the nextID in the chirps object (default was 0 so this increments by 1 each time)
  chirps[chirps.nextid++] = chirp;
  // function below writes it out
  writeChirps();
};

// pass in id & the chirp
let updateChirp = (id, chirp) => {
  // updates that one particular chirp
  chirps[id] = chirp;
  // function below write out that updated chirp
  writeChirps();
};

// pass in id
let deleteChirp = id => {
  // calls delete on that one particular id
  delete chirps[id];
  // function below writes out the changes
  writeChirps();
};

let writeChirps = () => {
  // does a writeFileSync on chirps.json and the data that it writes is the chirps (must be stringified)
  fs.writeFileSync("chirps.json", JSON.stringify(chirps));
};

export default {
  CreateChirp: createChirp,
  DeleteChirp: deleteChirp,
  GetChirps: getChirps,
  GetChirp: getChirp,
  UpdateChirp: updateChirp
};
