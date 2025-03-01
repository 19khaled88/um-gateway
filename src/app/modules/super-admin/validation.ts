import { z } from 'zod';

export const createSuperAdminZodSchema = z.object({
  password: z.string().optional(),
  superAdmin: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required'
      }),
      lastName: z.string({
        required_error: 'Last name is required'
      }),
      middleName: z.string().optional()
    }),
    gender: z.enum(['male', 'female'], {
      required_error: 'Gender is required'
    }),
    dateOfBirth: z.string().optional(),
    email: z
      .string({
        required_error: 'Email is required'
      })
      .email('Invalid email format'),
    contactNo: z.string({
      required_error: 'Contact number is required'
    }),
    emergencyContactNo: z.string({
      required_error: 'Emergency contact number is required'
    }),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    presentAddress: z.string({
      required_error: 'Present address is required'
    }),
    permanentAddress: z.string({
      required_error: 'Permanent address is required'
    }),
    managementDepartment: z.string({
      required_error: 'Management department is required'
    }),
    designation: z.string({
      required_error: 'Designation is required'
    }),
    profileImage: z.string().optional(),
    role: z.enum(['admin', 'super-admin']).default('super-admin'),
    isSuperAdmin: z.boolean().default(true),
    permissions: z.array(z.string()).default(['manage-users', 'manage-settings', 'full-access'])
  })
});


export const SuperAdminZodValidation ={
    createSuperAdminZodSchema,
}