import * as express from 'express';
import * as path from 'path'
import apiRouter from './routes';

const app = express();

app.use(express.static('public'));
//this is the body parser middleware that parses the JSON content that's POSTed to the API and creates the req.body and passes it along to POST req
app.use(express.json());
//middleware router from apiRouter out of routes
app.use('/api', apiRouter);
// JS code handles some routes on front end that are serparate from routes on the back end
app.get('*', (req, res) => { // anytimes there's a GET request that's not matched (aka if it doesn't match the prefix '/api'  above), then it should be caught by this wild card operator
    res.sendFile(path.join(__dirname, '../public/index.html')); // file to send is index.html. When the code compiles, it does not run from server.ts. Instead it runs from dist/server.js. So go up out of dist one time into public and send the index.html file manually which has React code attached to it and have react-router-dom kick on.
}) 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
