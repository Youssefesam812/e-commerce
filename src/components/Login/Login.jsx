import { Button, CircularProgress, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import { authContext } from '../../Context/AuthContext';

export default function Login() {

  const {settoken}= useContext(authContext);

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const user = {
    email: '',
    password: '',
  };

  function login(values) {
    setIsClicked(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then(function (response) {
        settoken(response.data.token)
        localStorage.setItem('tkn', response.data.token);
        setErrorMessage(null);
        setIsSuccess(true);
        setIsClicked(false);
        toast.success('Logged in Successfully!' );

        setTimeout(() => {
          navigate('/home');
        }, 2000);
      })
      .catch(function (error) {
        // setErrorMessage(error.response?.data?.message || 'An error occurred');
        const errorMsg = error.response?.data?.message || 'An error occurred';
        toast.error(errorMsg);
        setIsClicked(false);
      });
  }

  const loginFormik = useFormik({
    initialValues: user,
    onSubmit: login,
    validationSchema: yup.object().shape({
      email: yup.string().required('Email is required').email('Invalid email'),
      password: yup.string().required('Password is required').min(6).max(12),
    })
  });

  return (
    <>
    
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
     

      <form onSubmit={loginFormik.handleSubmit} className='md:min-h-[69.8%] min-h-[68.9%]'>
        <div className='w-4/5 m-auto mb-52'>
          <div className='text-center'>
            <h2 className='mt-8 text-2xl font-semibold'>Login into your account</h2>
          </div>
          <div className="mt-16 text-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
            <TextField
              id="email"
              name="email"
              label="Email:"
              variant="standard"
              className="w-2/3"
              value={loginFormik.values.email}
              onBlur={loginFormik.handleBlur}
              onChange={loginFormik.handleChange}
              error={!!loginFormik.errors.email && loginFormik.touched.email}
              helperText={loginFormik.errors.email && loginFormik.touched.email ? loginFormik.errors.email : ''}
            />
            <TextField
              id="password"
              name="password"
              label="Password:"
              type="password"
              variant="standard"
              className="w-2/3"
              value={loginFormik.values.password}
              onBlur={loginFormik.handleBlur}
              onChange={loginFormik.handleChange}
              error={!!loginFormik.errors.password && loginFormik.touched.password}
              helperText={loginFormik.errors.password && loginFormik.touched.password ? loginFormik.errors.password : ''}
            />
          </div>

          <div className='flex justify-between m-auto mt-12 w-2/3'>
            <Link className='font-semibold text-xl' to="/forgotpassword">Forgot your password?</Link>
            <div>
            <Button
              type="submit"
              sx={{
                backgroundColor: 'rgb(6, 102, 121)', 
                color: 'white',
                borderRadius: '1rem',

                 padding:'7px 25px'
              }}
              
            >
               {!isClicked ? "Login" : <CircularProgress color="#fff" size={20} /> }
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
