import { Router } from 'express';
import ChirpStore from '../utils/chirpstore';

const router = Router();

// GET /api/chirps
router.get('/', (req, res) => {
    const data = ChirpStore.GetChirps();
    res.json(data);
})

// GET /api/chirps/:chirpid
// Instead of getting an individual chirp by using ChirpStore.GetChirp() it's best to use move it into a variable called chirpid and set it to req.params.chirpid rather than passing it in directly. May seem like overkill in this lab, but don't want to mix networking layer(conroller methods) with data layer(ChirpStore file)
router.get('/:chirpid', (req, res) => {
    const chirpid = req.params.chirpid;
    const chirp = ChirpStore.GetChirp(chirpid);
    res.json(chirp);
})

// POST /api/chirps
router.post('/', (req, res) => {
    const chirp = req.body;
    ChirpStore.CreateChirp(chirp);
    res.status(201).json('Chirp Created');
    // { username: '', message: ''}
});

// PUT /api/chirps/:chirpid
router.put('/:chirpid', (req, res) => {
    const chirpid = req.params.chirpid;
    const chirp = req.body;
    ChirpStore.UpdateChirp(chirpid, chirp);
    res.status(201).json(`Chirp ${chirpid} Updated`);
})

// DELETE /api/chirps/:chirpid
router.delete('/:chirpid', (req, res) => {
    const chirpid = req.params.chirpid;
    ChirpStore.DeleteChirp(chirpid);
    res.status(201).json(`Chirp ${chirpid} Deleted`);
})

export default router;