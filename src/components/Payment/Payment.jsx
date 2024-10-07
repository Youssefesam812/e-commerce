import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import CircularProgress from '@mui/material/CircularProgress' 


export default function Payment() {

    const { cartId, clearUI } = useContext(CartContext)
    const [isOnline, setIsOnline] = useState(true)
    const [loading, setLoading] = useState(false) 

    function detectAndCall(values) {
        setLoading(true) 
        if (isOnline) {
            createOnlineOrder(values)
        } else {
            createCashOrder(values)
        }
    }

    function createCashOrder(values) {
        const backendBody = {
            shippingAddress: values,
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, backendBody, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        })
        .then((res) => {
            console.log(res);
            clearUI()
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false) 
        })
    }

    function createOnlineOrder(values) {
        const backendBody = {
            shippingAddress: values,
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, backendBody, {
            headers: {
                token: localStorage.getItem('tkn')
            },
            params: {
                url: 'http://localhost:5173'
            }
        })
        .then((res) => {
            window.open(res.data.session.url, '_self')
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false) 
        })
    }

    const paymentFormik = useFormik({
        initialValues: {
            details: '',
            city: '',
            phone: '',
        },
        onSubmit: detectAndCall,
    })

    return (
        <>
            {loading && (
                <div className="h-screen bg-[#508C9B] flex justify-center items-center fixed inset-0 z-50">
                    <CircularProgress size={80} color="inherit" />
                </div>
            )}
            <div className='md:min-h-[74%] min-h-[75.2%] flex items-center m-0'>
                <form className="mx-auto py-9 w-[60%]" onSubmit={paymentFormik.handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            value={paymentFormik.values.details}
                            onBlur={paymentFormik.handleBlur}
                            onChange={paymentFormik.handleChange}
                            name="details"
                            id="details"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-[peer-focus:text-[#134B70] focus:outline-none focus:ring-0 focus:border-[peer-focus:text-[#134B70]] peer-focus:dark:text-[#37617c] peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="details"
                            className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#134B70] peer-focus:dark:text-[#134B70] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 mb-4"
                        >
                            details
                        </label>
                        {paymentFormik.errors.details && paymentFormik.touched.details ? (
                            <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {paymentFormik.errors.details}
                            </div>
                        ) : ''}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="tel"
                            value={paymentFormik.values.phone}
                            onBlur={paymentFormik.handleBlur}
                            onChange={paymentFormik.handleChange}
                            name="phone"
                            id="phone"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-[peer-focus:text-[#134B70] focus:outline-none focus:ring-0 focus:border-[peer-focus:text-[#134B70]] peer-focus:dark:text-[#37617c] peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="phone"
                            className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#134B70] peer-focus:dark:text-[#134B70] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                        >
                            phone
                        </label>
                        {paymentFormik.errors.phone && paymentFormik.touched.phone ? (
                            <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {paymentFormik.errors.phone}
                            </div>
                        ) : ''}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            value={paymentFormik.values.city}
                            onBlur={paymentFormik.handleBlur}
                            onChange={paymentFormik.handleChange}
                            name="city"
                            id="city"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-[peer-focus:text-[#134B70]] focus:outline-none focus:ring-0 focus:border-[peer-focus:text-[#134B70] peer-focus:dark:text-[#37617c] peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="city"
                            className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#134B70] peer-focus:dark:text-[#134B70] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                        >
                            city
                        </label>
                        {paymentFormik.errors.city && paymentFormik.touched.city ? (
                            <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {paymentFormik.errors.city}
                            </div>
                        ) : ''}
                    </div>
                    <div className='justify-center flex mt-12'>
                        <button
                            onClick={() => setIsOnline(false)}
                            type="submit"
                            className="text-white bg-[#134B70] hover:bg-[#265879] focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#134B70] dark:hover:bg-[#265879]"
                        >
                            Cash Order
                        </button>
                        <button
                            onClick={() => setIsOnline(true)}
                            type="submit"
                            className="mx-4 text-white bg-[#134B70] hover:bg-[#265879] focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#134B70] dark:hover:bg-[#265879]"
                        >
                            Online Order
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
