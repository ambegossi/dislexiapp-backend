import AppError from '@shared/errors/AppError';
import { ExpressErrorMiddleware } from '../../../../@types/middleware';

const generalException: ExpressErrorMiddleware = (
  err,
  request,
  response,
  _,
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 500,
    message: 'Internal server error',
  });
};

export default generalException;
