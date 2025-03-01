import express from 'express';

import { AcademicSemesterRouter } from '../modules/academicSemester/route';
import { UserRoutes } from '../modules/users/route';
import { AcademicFacultyRouter } from '../modules/academicFaculty/route';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/route';
import { AuthRoutes } from '../modules/auth/route';
import { FacultyRoutes } from '../modules/faculty/route';
import { StudentRoutes } from '../modules/student/route';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/route';
import { SuperAdminRoutes } from '../modules/super-admin/route';

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
    path: '/academic-department-gateway',
    routes: AcademicDepartmentRouter
  },
  {
    path: '/user-gateway',
    routes: UserRoutes
  },
  {
    path:'/student-gateway',
    routes:StudentRoutes
  },
  {
    path:'/auth-gateway',
    routes:AuthRoutes
  },
  {
    path:'/faculty-gateway',
    routes:FacultyRoutes
  },
  {
    path:'/super-admin-gateway',
    routes: SuperAdminRoutes,
  },
  {
    path:'/management-gateway',
    routes:ManagementDepartmentRoutes
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
