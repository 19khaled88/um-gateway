import express from 'express';

import { AcademicSemesterRouter } from '../modules/academicSemester/route';
import { UserRoutes } from '../modules/users/route';
import { AcademicFacultyRouter } from '../modules/academicFaculty/route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academic-semesters-gateway',
    routes: AcademicSemesterRouter
  },
  {
    path: '/academic-faculty-gateway',
    routes: AcademicFacultyRouter
  },
  {
    path: '/user-gateway',
    routes: UserRoutes
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
