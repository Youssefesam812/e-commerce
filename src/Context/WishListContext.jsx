import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WishListContext = createContext();

export default function WishListProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || {});

  



  async function addWishList(productId) {
    try {
      await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, {
        headers: {
            token: localStorage.getItem('tkn')
        }
    });
      setWishlist((prev) => ({
        ...prev,
        [productId]: true,
      }));
      localStorage.setItem('wishlist', JSON.stringify({
        ...wishlist,
        [productId]: true,
      }));
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return false;
    }
  }

  async function removeWishList(productId) {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,  {
        headers: {
            token: localStorage.getItem('tkn')
        }
    });
      setWishlist((prev) => {
        const updatedWishlist = { ...prev };
        delete updatedWishlist[productId];
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        return updatedWishlist;
      });
      return true;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return false;
    }
  }

  async function getWishlist() {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',  {
        headers: {
            token: localStorage.getItem('tkn')
        }
    });
      setAllProducts(response.data.data);
      return true;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return false;
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishListContext.Provider value={{ addWishList, removeWishList, getWishlist, allProducts, wishlist }}>
      {children}
    </WishListContext.Provider>
  );
}
