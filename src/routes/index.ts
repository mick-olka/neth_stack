import * as homeController from '@/controller/home';

import { Router } from 'express';

const router = Router();

router.get('/', homeController.getAppInfo);

router.get('/index', homeController.getMainPage);

export default router;
