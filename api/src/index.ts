import express from 'express';
import router from './router';
import cookieParser from 'cookie-parser';
import swaggerDocs from './utils/swagger';

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
  response.send('<h1>go to ./docs</h1>');
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
  swaggerDocs(app, port);
});

app.use('/api', router());
