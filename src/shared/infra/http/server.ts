import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from '@config/upload';

import generalException from './middlewares/generalException';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(routes);

app.use(generalException);

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.listen(3333, () => {
  console.log('🚀 server started on port 3333');
});
