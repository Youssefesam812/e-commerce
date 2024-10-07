import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function UpdatePassword() {
  const navigate = useNavigate();

  const initialValues = {
    currentPassword: '',
    password: '',
    rePassword: '',
  };
  const headers= {
    token: localStorage.getItem('tkn')
  }

  async function handleUpdatePassword(values, { resetForm }) {
    console.log('Submitting values:', values); 
   console.log(localStorage.getItem('tkn'))
    try {
      const response = await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', values, {
        headers
      });

      console.log('Response status:', response.status);  
      if (response.status === 200) {
        toast.success('Password Updated');
        resetForm();
        navigate('/home');
      } else {
        toast.error('Failed to update password.');
      }
    } catch (error) {
      console.error('Error in Updating Password:', error);  
      toast.error('Error in Updating Password.');
    }
  }

  const validationSchema = yup.object({
    currentPassword: yup.string().required('Current password is required').min(6, 'Password must be at least 6 characters').max(12, 'Password can be at most 12 characters'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(12, 'Password can be at most 12 characters'),
    rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required'),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: handleUpdatePassword,
    validationSchema,
  });

  return (
    <div className="max-w-md mx-auto p-4 flex items-center justify-center w-[100%] md:min-h-[74%] min-h-[75.2%]">
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <h2 className="text-2xl font-semibold mb-4">Update Password</h2>

        <div className="mb-4 mt-10">
          <TextField 
            id="currentPassword"
            name="currentPassword"
            label="Current Password"
            type="password"
            variant="standard"
            className="w-full"
            value={formik.values.currentPassword} 
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={!!formik.errors.currentPassword && formik.touched.currentPassword}
            helperText={formik.errors.currentPassword && formik.touched.currentPassword ? formik.errors.currentPassword : ''}
          />
        </div>

        <div className="mb-4 mt-10">
          <TextField
            id="password"
            name="password"
            label="New Password"
            type="password"
            variant="standard"
            className="w-full" 
            value={formik.values.password} 
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={!!formik.errors.password && formik.touched.password}
            helperText={formik.errors.password && formik.touched.password ? formik.errors.password : ''}
          />
        </div>

        <div className="mb-4 mt-10">
          <TextField
            id="rePassword"
            name="rePassword"
            label="Confirm New Password"
            type="password"
            variant="standard"
            className="w-full" 
            value={formik.values.rePassword} 
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={!!formik.errors.rePassword && formik.touched.rePassword}
            helperText={formik.errors.rePassword && formik.touched.rePassword ? formik.errors.rePassword : ''}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 mt-3 bg-[#2b5f82] text-white rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
