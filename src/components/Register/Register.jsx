import { Button, CircularProgress, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import * as yup from 'yup';

export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const user = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  };

  async function register(values) {
    setIsClicked(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then(function (response) {
        setIsSuccess(true);
        setIsClicked(false);
        toast.success('Successfully Registered!');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch(function (error) {
        // setErrorMessage(error.response?.data?.message || 'An error occurred');
        const errorMsg = error.response?.data?.message || 'An error occurred';
        toast.error(errorMsg);
       
        setIsClicked(false);

        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });
  }

  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: register,
    validationSchema: yup.object().shape({
      name: yup.string().required('Name is required').min(3, "Name must be more than 3 characters").max(10, "Name must be less than 10 characters"),
      email: yup.string().required('Email is required').email('Invalid email'),
      password: yup.string().required('Password is required').min(6).max(12),
      rePassword: yup.string().required('Re-Password is required').oneOf([yup.ref('password')], "Re-Password must be equal to the password"),
      phone: yup.string().required('Phone is required').matches(/^(20)?01[0125][0-9]{8}$/, "Wrong phone number format"),
    })
  });

  return (
    <>
    {/* <Toaster position="top-right" reverseOrder={false} /> */}
      
      <form onSubmit={registerFormik.handleSubmit}>
        <div className='w-4/5 m-auto'>
          
          <div className='text-center'>
            <h2 className='mt-8 text-2xl font-semibold'>Register Now</h2>
          </div>
          <div className="mt-8  text-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
            <TextField
              id="name"
              name="name"
              label="Name:"
              variant="standard"
              className="w-2/3"
              value={registerFormik.values.name}
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}    
              error={!!registerFormik.errors.name && registerFormik.touched.name}
              helperText={registerFormik.errors.name && registerFormik.touched.name ? registerFormik.errors.name : ''}
            />
            <TextField
              id="email"
              name="email"
              label="Email:"
              variant="standard"
              className="w-2/3"
              value={registerFormik.values.email}
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              error={!!registerFormik.errors.email && registerFormik.touched.email}
              helperText={registerFormik.errors.email && registerFormik.touched.email ? registerFormik.errors.email : ''}
            />
            <TextField
              id="password"
              name="password"
              label="Password:"
              variant="standard"
              type="password"
              className="w-2/3"
              value={registerFormik.values.password}
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              error={!!registerFormik.errors.password && registerFormik.touched.password}
              helperText={registerFormik.errors.password && registerFormik.touched.password ? registerFormik.errors.password : ''}
            />
            <TextField
              id="rePassword"
              name="rePassword"
              label="Re-Password:"
              variant="standard"
              type="password"
              className="w-2/3"
              value={registerFormik.values.rePassword}
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              error={!!registerFormik.errors.rePassword && registerFormik.touched.rePassword}
              helperText={registerFormik.errors.rePassword && registerFormik.touched.rePassword ? registerFormik.errors.rePassword : ''}
            />
            <TextField
              id="phone"
              name="phone"
              label="Phone:"
              variant="standard"
              className="w-2/3"
              value={registerFormik.values.phone}
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              error={!!registerFormik.errors.phone && registerFormik.touched.phone}
              helperText={registerFormik.errors.phone && registerFormik.touched.phone ? registerFormik.errors.phone : ''}
            />
          </div>

          <div className='flex justify-center m-auto mt-12 mb-16'>
      <Button
        type="submit"
        sx={{
          backgroundColor: 'rgb(6, 102, 121)', 
          color: 'white',
          borderRadius: '1rem',
          width: '25%',
         
        }}
        className='rounded-2xl'
      >
        {!isClicked ? "Register" : <CircularProgress /> }
      </Button>
    </div>
        </div>
      </form>
    </>
  );
}
