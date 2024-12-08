import express from 'express';

import { AcademicSemesterRouter } from '../modules/academicSemester/route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academic-semesters-gateway',
    routes: AcademicSemesterRouter
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
