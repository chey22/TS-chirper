import * as React from 'react';
import { useState, useEffect } from 'react'
import { IChirp } from '../utils/types'
import HomeChirpCard from '../components/HomeChirpCard';

const Home: React.FC<HomeProps> = () => {

    const [chirps, setChirps] = useState<IChirp[]>([]); // <generic> says this array will look like an array of IChirp objects when compiled by TS

    // fetch the info in that component. Executed only on page load by passing in a blank array
    useEffect(() => {
        (async () => {
            let res = await fetch('/api/chirps'); // await proomise of a fetch request tp /api/chirps
            let chirps = await res.json(); // awaits a promise of res.json
            setChirps(chirps); // call setChirps and set list of chirps to state
        })(); // immediately invokes an anonymous function - function code in first () and second () invokes said function
    }, []);

    return (
        <main className="container">
            <section className="row my-2 justify-content-center">
                {chirps.map(chirp => ( //for each indiv chirp, return the following with () and not {} for an implicit multi-line return
                    <HomeChirpCard key={`chirp-card-home-${chirp.id}`} chirp={chirp} /> // intellisense will complete chirp.___ because it refers to the chirp interface IChirp
                    //make key unique and not just 1, 2, 3...
                ))}
            </section>
        </main>
    )
}

interface HomeProps {}

export default Home;