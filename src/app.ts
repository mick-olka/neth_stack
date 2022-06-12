import * as errorHandler from '@/middlewares/errorHandler';

import path from 'path';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from '@/routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import sassMiddleware from 'node-sass-middleware';
import { initSwagger } from '@/swagger';

const whitelist = ['localhost:8080', '192.168.0.103:8080'];
const corsOptionsDelegate = function (req: any, callback: any) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

export const createApp = (): express.Application => {
  const app = express();

  dotenv.config(); //  .env activation
  // view engine setup
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'hbs');
  // other
  app.use(cookieParser());
  app.use(
    sassMiddleware({
      src: path.join(__dirname, '../public'),
      dest: path.join(__dirname, '../public'),
      indentedSyntax: false, // true = .sass and false = .scss
      sourceMap: true,
    }),
  );
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(cors(corsOptionsDelegate));
  app.use(helmet());
  app.use(morgan('dev')); //  logging
  app.use(express.json()); //  expects request data to be sent in JSON format, which often resembles a simple JS object
  app.use(express.urlencoded({ extended: true })); //  expects request data to be sent encoded in the URL, usually in strings or arrays

  // API Routes
  app.use('/', routes);
  initSwagger(app);

  // Error Middleware
  app.use(errorHandler.genericErrorHandler);
  app.use(errorHandler.notFoundError);

  return app;
};
