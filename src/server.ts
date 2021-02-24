import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import routes from './shared/routes';

import './shared/database';
import generalException from './shared/middlewares/generalException';

const app = express();

app.use(express.json());
app.use(routes);

app.use(generalException);

app.listen(3333, () => {
  console.log('server started on port 3333');
});
