import * as homeController from '@/controller/home';

import { Router } from 'express';
import * as fs from 'fs';
import path from 'path';

const router = Router();

router.get('/', homeController.getAppInfo);

router.get('/index', homeController.getMainPage);

//  test/435435/43543 params
//  test?name=43543&r=ghfjdg
router.get('/write/', (req, res, next) => {
  const txt = req.query.text;
  fs.appendFileSync(path.resolve(__dirname, 'text.txt'), txt as string);
  let result = fs.readFileSync(path.resolve(__dirname, 'text.txt'), 'utf-8');
  res.json(result);
});

export default router;
