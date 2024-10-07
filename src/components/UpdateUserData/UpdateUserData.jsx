
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function UpdateUserData() {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
  };
  const headers= {
    token: localStorage.getItem('tkn')
  }

  async function handleUpdateUserData(values, { resetForm }) {
    console.log('Submitting values:', values); 
   console.log(localStorage.getItem('tkn'))
    try {
      const response = await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', values, {
        headers
      });

      console.log('Response status:', response.status);  
      if (response.status === 200) {
        toast.success('Data Updated');
        resetForm();
        navigate('/home');
      } else {
        toast.error('Failed to update Data.');
      }
    } catch (error) {
      console.error('Error in Updating Data:', error);  
      toast.error('Error in Updating Data.');
    }
  }

  const validationSchema = yup.object({
    name: yup.string().required('Name is required').min(3, "Name must be more than 3 characters").max(10, "Name must be less than 10 characters"),
    email: yup.string().required('Email is required').email('Invalid email'),
    phone: yup.string().required('Phone is required').matches(/^(20)?01[0125][0-9]{8}$/, "Wrong phone number format"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: handleUpdateUserData,
    validationSchema,
  });

  return (
    <div className="max-w-md mx-auto p-4 flex items-center justify-center w-[100%] md:min-h-[74%] min-h-[75.2%]">
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <h2 className="text-2xl font-semibold mb-4">Update Data</h2>

        <div className="mb-4 mt-10">
          <TextField 
            id="name"
            name="name"
            label="name"
            type="text"
            variant="standard"
            className="w-full"
            value={formik.values.name} 
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={!!formik.errors.name && formik.touched.name}
            helperText={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
          />
        </div>

        <div className="mb-4 mt-10">
          <TextField
            id="email"
            name="email"
            label="email"
            type="email"
            variant="standard"
            className="w-full" 
            value={formik.values.email} 
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={!!formik.errors.email && formik.touched.email}
            helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
          />
        </div>

        <div className="mb-4 mt-10">
          <TextField
            id="phone"
            name="phone"
            label="phone"
            type="text"
            variant="standard"
            className="w-full" 
            value={formik.values.phone} 
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={!!formik.errors.phone && formik.touched.phone}
            helperText={formik.errors.phone && formik.touched.phone ? formik.errors.phone : ''}
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

