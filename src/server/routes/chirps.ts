import { Router } from "express";
import ChirpStore from "../utils/chirpstore";

const router = Router();

// GET /api/chirps
router.get("/", (req, res) => {
  const data = ChirpStore.GetChirps();
  const chirps = Object.keys(data).map(key => {
    // data structure manipulation - object of objects converted to an array of objects
    // Object.keys returns an array of the keys of an object, i.e. the properties of the chirps.json object of objects. Change the res.json(data) to res.json(chirps). The keys are the ids
    // .map through that array of values to create a new array of object literals
    return {
      id: key,
      username: data[key].username, // in the data object at position key should have an object with a property of .username
      message: data[key].message // in the data object at position key should have an object with a property of .message
    };
  });

  chirps.pop(); // removes the element id: "nextid" (at the end) from the array
  res.json(chirps);
});

// GET /api/chirps/:chirpid

router.get("/:chirpid", (req, res) => { // Instead of getting an individual chirp by using ChirpStore.GetChirp() it's best to use move it into a variable called chirpid and set it to req.params.chirpid rather than passing it in directly. May seem like overkill in this lab, but don't want to mix networking layer(conroller methods) with data layer(ChirpStore file)
  const chirpid = req.params.chirpid;
  const chirp = ChirpStore.GetChirp(chirpid);
  res.json({ id: chirpid, ...chirp }); // instead of A) modifying the interface of IChirp to make id an optional prop or B) or making a secondary one with just username and msg, we need to C) change the server to make sure its response does match a singular IChirp by changing the {chirp} object to { id: chirpid, ...chirp }.
  // This includes A) a property of id plus B) properties of the original response to be spread out as properties of this new object by use of a spread operator. It now matches the IChirp interface so that there's nothing to change on the front end :)
});

// POST /api/chirps
router.post("/", (req, res) => {
  const chirp = req.body;
  ChirpStore.CreateChirp(chirp);
  res.status(201).json("Chirp Created");
  // { username: '', message: ''}
});

// PUT /api/chirps/:chirpid
router.put("/:chirpid", (req, res) => {
  const chirpid = req.params.chirpid;
  const chirp = req.body;
  ChirpStore.UpdateChirp(chirpid, chirp);
  res.status(201).json(`Chirp ${chirpid} Updated`);
});

// DELETE /api/chirps/:chirpid
router.delete("/:chirpid", (req, res) => {
  const chirpid = req.params.chirpid;
  ChirpStore.DeleteChirp(chirpid);
  res.status(201).json(`Chirp ${chirpid} Deleted`);
});

export default router;
