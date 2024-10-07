import axios from 'axios';
import React, { createContext,useEffect, useState } from 'react';


export const CartContext = createContext();

export default function CartProvider({ children }) {


  const [allProducts, setAllProducts] = useState([])
  const [totalCartPrice, settotalCartPrice] = useState(0)
  const [numOfCartItems, setnumOfCartItems] = useState(0)

  const [cartId,setCartId]= useState(null)

  function clearUI(){
    setnumOfCartItems(0)
    setAllProducts(null)
    settotalCartPrice(0)
    setCartId(null)
  }

  let headers= {
    token : localStorage.getItem('tkn')
  }

  async function addProduct(productId) {
    try {
        const resp = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            "productId": productId
        }, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        });

        console.log('Response from addProduct:', resp);
        setnumOfCartItems(prev => prev + 1);
        getUserCart();

        return true;
    } catch (error) {
        console.error('Error adding product:', error);
        return false;
    }
}



   function getUserCart(){
    axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
          token: localStorage.getItem('tkn')
      }
  }).then((res)=>{

      setnumOfCartItems(res.data.numOfCartItems)
      setAllProducts(res.data.data.products)
      settotalCartPrice(res.data.data.totalCartPrice)

      setCartId(res.data.data._id)
    })
    .catch((error)=>{
           
      console.log("error");
      
    })
  }

useEffect(()=>{
  getUserCart()
},[])


function updateCount(productId ,  newCount){
  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
       "count" : newCount,
  },  {
    headers: {
        token: localStorage.getItem('tkn')
    }
}).then((res)=>{

    setnumOfCartItems(res.data.numOfCartItems)
    setAllProducts(res.data.data.products)
    settotalCartPrice(res.data.data.totalCartPrice)

  })
  .catch((error)=>{
     
    console.log(error);
    
  })



}

async function deleteProduct(productId){

  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,  {
    headers: {
        token: localStorage.getItem('tkn')
    }
})
   .then((res)=> {

     setnumOfCartItems(res.data.numOfCartItems)
     setAllProducts(res.data.data.products)
     settotalCartPrice(res.data.data.totalCartPrice)

     return true
   } 
   )
   .catch((error)=> {

     return false
   }
   )
 }

async function clearCart(){

  return axios.delete("https://ecommerce.routemisr.com/api/v1/cart" ,  {
    headers: {
        token: localStorage.getItem('tkn')
    }
})
   .then((res)=> {

    setnumOfCartItems(0)
     setAllProducts(null)
     settotalCartPrice(0)
     return true
   } 
   )
   .catch((error)=> {

     return false
   }
   )
 }
  return (
    <CartContext.Provider value={{ addProduct , 
      allProducts,
      totalCartPrice,
      numOfCartItems,
      getUserCart,
      updateCount,
      deleteProduct,
      clearCart,
      cartId,
      clearUI }}>
      {children}
    </CartContext.Provider>
  );
}
