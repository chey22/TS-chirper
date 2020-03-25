import * as express from 'express';
import apiRouter from './routes';

const app = express();

app.use(express.static('public'));
//this is the body parser middleware that parses the JSON content that's POSTed to the API and creates the req.body and passes it along to POST req
app.use(express.json());
//middleware router from apiRouter out of routes
app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
