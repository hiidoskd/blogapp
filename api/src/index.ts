import express from 'express';
import router from './router';
import cookieParser from 'cookie-parser';

const app = express();
const port = 8080;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.use('/api', router());