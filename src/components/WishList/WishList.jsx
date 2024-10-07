import React, { useContext, useEffect, useState } from 'react';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';

export default function WishList() {
  const { removeWishList, allProducts, getWishlist } = useContext(WishListContext);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchData() {
      setLoading(true); 
      await getWishlist();
      setLoading(false); 
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    const deleteFlag = await removeWishList(id); 
    if (deleteFlag) {
      console.log('Remove clicked for product:', id);
      
      localStorage.removeItem(`wishlist-${id}`);
      getWishlist();
      toast.success('Deleted successfully');
    } else {
      toast.error('Error Occurred');
    }
  }

  return (
    <>
      <div className="flex flex-col md:min-h-[74%] min-h-[75.2%] bg-[#508C9B]">
        <div className="flex-grow">
          <div className="p-4 md:p-8 m-auto">
            <h2 className='text-center text-white mb-9 mt-4 text-3xl'>Your WishList</h2>

            {loading ? (
             
                <div className="fixed inset-0 bg-[#508c9b45] flex justify-center items-center z-50">
                  <CircularProgress size={80} color="inherit" />
                </div>
              
            ) : (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3 md:px-6">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-4 py-3 md:px-6">Product</th>
                      <th scope="col" className="px-4 py-3 md:px-6">Price</th>
                      <th scope="col" className="px-4 py-3 md:px-6">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts?.map((product) => (
                      <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="p-4">
                          <img
                            src={product.imageCover}
                            className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 object-cover"
                            alt={product.title}
                          />
                        </td>
                        <td className="px-4 py-4 md:px-6 font-semibold text-gray-900 dark:text-white">
                          {product.title} 
                        </td>
                        <td className="px-4 py-4 md:px-6 font-semibold text-gray-900 dark:text-white">
                          {product.price}EGP
                        </td>
                        <td className="px-4 py-4 md:px-6">
                        <td className="px-4 py-4 md:px-6">
                          <button
                            onClick={(e) => {
                              e.preventDefault(); 
                              handleDelete(product._id);
                            }}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </td>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
