import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import generalException from '@shared/infra/http/middlewares/generalException';
import routes from './routes';

import '@shared/infra/typeorm';

const app = express();

app.use(express.json());
app.use(routes);

app.use(generalException);

app.listen(3333, () => {
  console.log('server started on port 3333');
});