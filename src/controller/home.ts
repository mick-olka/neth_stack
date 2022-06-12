import * as homeService from '@/service/home';
import { catchAsync } from '@/utils/catchAsync';

import { NextFunction, Request, Response } from 'express';

export const getAppInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = homeService.getAppInfo();

    res.json(result);
  },
);

export const getMainPage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //
    res.render('index', { title: 'Main' });
  },
);
