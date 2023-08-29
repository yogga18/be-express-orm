import { Response, Request, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validateDesc = [
  check('description').isString(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        message: errors.array(),
      });
    }

    return next();
  },
];

export default validateDesc;
