import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

export default function Cart() {
  const { allProducts, totalCartPrice, numOfCartItems, updateCount, deleteProduct, clearCart } = useContext(CartContext);
  const [isButtonHidden, setIsButtonHidden] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProducts = async () => {
      setLoading(true);
      if (allProducts && allProducts.length > 0) {
        setIsButtonHidden(false);
      } else {
        setIsButtonHidden(true); 
      }
      setLoading(false);
    };
  
    checkProducts();
  }, [allProducts]);
  

  function handleUpdateCount(id, newCount) {
    updateCount(id, newCount);
  }

  async function handleDelete(id) {
    const deleteFlag = await deleteProduct(id);
    if (deleteFlag) {
      toast.success('Deleted successfully');
    } else {
      toast.error('Error Occurred');
    }
  }

  async function handleClearCart() {
    const clearFlag = await clearCart();
    if (clearFlag) {
      toast.success('Cart Cleared successfully');
    } else {
      toast.error('Error Occurred');
    }
  }

  if (loading) {
    return (
      <div className="h-screen bg-[#508C9B] flex justify-center items-center">
        <CircularProgress size={80} color="inherit" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:min-h-[74%] min-h-[75.2%] bg-[#508C9B]">
      <div className="flex-grow">
        <div className='p-4 md:p-8 m-auto'>
          <div className='flex justify-center'>
            <h2 className='text-center bg-[#134B70] p-4 text-white rounded-lg text-base md:text-lg lg:text-xl'>
              Total Price: <span className='text-teal-500'>{totalCartPrice}</span> LE
            </h2>
          </div>
          <div className='flex justify-center items-center mt-4 md:mt-2'>
            <div className='w-9/12 md:w-3/5 flex justify-center md:justify-end '>
              <p className='text-center mt-5 bg-[#134B70] p-4 text-white rounded-lg text-sm md:text-base'>
                Your cart includes <span className='text-teal-500'>{numOfCartItems}</span> different items
              </p>
            </div>
            <div className='flex justify-end w-3/12 md:w-2/5 md:mt-9 mt-7'>
              <button
                onClick={handleClearCart}
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-4 px-5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Clear Cart
              </button>
            </div>
          </div>


         

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3 md:px-6">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-4 py-3 md:px-6">Product</th>
                  <th scope="col" className="px-4 py-3 md:px-6">Qty</th>
                  <th scope="col" className="px-4 py-3 md:px-6">Price</th>
                  <th scope="col" className="px-4 py-3 md:px-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {allProducts?.map(product => (
                  <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="p-4">
                      <img src={product.product?.imageCover} className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 object-cover" alt={product.product?.title} />
                    </td>
                    <td className="px-4 py-4 md:px-6 font-semibold text-gray-900 dark:text-white">
                      {product.product?.title}
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      <div className="flex items-center">
                        <button disabled={product.count === 1} onClick={() => handleUpdateCount(product.product._id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:focus:ring-gray-700">
                          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>

                        <div>
                          <input type="number" className="w-14 text-center appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={product.count} readOnly />
                        </div>

                        <button onClick={() => handleUpdateCount(product.product._id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:focus:ring-gray-700">
                          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 9h16M9 1v16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 md:px-6 font-semibold text-gray-900 dark:text-white">{product.price} LE</td>
                    <td className="px-4 py-4 md:px-6">
                      <button onClick={() => handleDelete(product.product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       
        </div>
        <Link to='/payment'>
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className={`${isButtonHidden ? 'hidden' : ''} mt-7 text-white bg-[#134B70] hover:bg-[#16353c] focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-11 py-4 text-center`}
            >
              Pay
            </button>
          </div>
          </Link>
      </div>
    </div>
  );
}
