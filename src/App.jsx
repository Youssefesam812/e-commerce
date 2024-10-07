import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import AuthContext from './Context/AuthContext';
import Products from './components/Products/Products';
import NotFound from './components/NotFound/NotFound';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import Main from './components/Main/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WishListContext from './Context/WishListContext';
import CartContext from './Context/CartContext';
import Brands from './components/Brands/Brands';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import { Toaster } from 'react-hot-toast';
import Payment from './components/Payment/Payment';
import WishList from './components/WishList/WishList';
import ForgotPassword from './components/ForgetPassword/ForgetPassword';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import { useEffect, useState } from 'react';
import UpdateUserData from './components/UpdateUserData/UpdateUserData';


const router = createBrowserRouter([
  {path: '/', element: <Home />, children: [
    { path: 'register', element: <Register /> },
    { path: 'login', element: <Login /> },
    { path: '/', element: <Navigate to="/login" /> },
    { path: 'forgotpassword', element: <ForgotPassword /> },
    { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
    { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
    { path: 'home', element: <ProtectedRoute><Main /></ProtectedRoute> },
    { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
    { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
    { path: 'payment', element: <ProtectedRoute><Payment /></ProtectedRoute> },
    { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
    { path: 'allorders', element: <ProtectedRoute><Main /></ProtectedRoute> },
    { path: 'updatepassword', element: <ProtectedRoute><UpdatePassword /></ProtectedRoute> },
    { path: 'updateuserdata', element: <ProtectedRoute><UpdateUserData /></ProtectedRoute> },
    {path: 'productDetails/:id' , element:<ProtectedRoute>
      <ProductDetails />
      </ProtectedRoute>},
    { path: '*', element: <NotFound /> }
  ]},
]);


const queryClient = new QueryClient();

function App() {


  useEffect(() => {
    const isFirstVisit = !sessionStorage.getItem('hasVisited');

    if (isFirstVisit) {
    
      localStorage.removeItem('tkn');

  
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return (
    <AuthContext>
      <QueryClientProvider client={queryClient}>
        <WishListContext>
          <CartContext>
            <RouterProvider router={router} />
            <Toaster />
          </CartContext>
        </WishListContext>
      </QueryClientProvider>
    </AuthContext>
  );
}

export default App;
