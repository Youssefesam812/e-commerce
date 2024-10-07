import axios from 'axios';
import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import { Star } from '@mui/icons-material';
import { WishListContext } from '../../Context/WishListContext';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ProductDetails() {
    const { addWishList, removeWishList } = React.useContext(WishListContext);
    const [wishlist, setWishlist] = React.useState(() => JSON.parse(localStorage.getItem('wishlist')) || {});
    
    React.useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const handleClick = (productId) => {
        if (wishlist[productId]) {  
            removeWishList(productId); 
            setWishlist((prev) => {
                const updatedWishlist = { ...prev };
                delete updatedWishlist[productId];
                return updatedWishlist;
            });
        } else {
            addWishList(productId); 
            setWishlist((prev) => ({
                ...prev,
                [productId]: true, 
            }));
        }
    };

    async function handleAddProduct(id) {
        const resFlag = await addProduct(id);
        if (resFlag) {   
            toast.success('Product Added Successfully', { position: 'top-right', duration: 3000 });
        } else {
            toast.error('Adding Product Error', { position: 'top-right', duration: 3000 });
        }
    }

    const { id } = useParams();
    const { addProduct } = useContext(CartContext);

    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: ['eachProductDetails', id],
        queryFn: getProductDetails,
    });

    if (isLoading) {
        return (
            <div className="h-screen bg-[#508C9B] flex justify-center items-center">
                <CircularProgress size={80} color="inherit" />
            </div>
        );
    }

    if (isError) {
        return <h1>Error</h1>;
    }

    const objectDetails = data?.data?.data;

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true, 
    };

    return (
        <div className='px-4 mx-auto p-5 mt-10 mb-12 flex flex-col md:flex-row items-center justify-center overflow-hidden'>
            <div className='w-full md:w-1/4 mb-6 md:mb-0'>
                <Slider {...settings}>
                    {objectDetails.images.map((image) => (
                        <img src={image} className='w-full' alt={objectDetails.title} key={image} />
                    ))}
                </Slider>
            </div>
            <div className='w-full md:w-[60%] md:ml-6 mt-9 md:mt-0'>
                <h2 className='text-2xl md:text-3xl font-semibold'>{objectDetails.title}</h2>
                <p className='mt-4'><span className='font-medium'>Description:</span>  {objectDetails.description}</p>
                <h5 className='mt-4'> <span className='font-medium'>Category:</span> {objectDetails.category.name}</h5>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
                    <h5 className='mt-4'><span className='font-medium'>Price:</span>  {objectDetails.price}EGP</h5>
                    <div className='flex items-center mt-4 md:mt-0'>
                        <Star sx={{ color: '#DAA520' }} />
                        <div className='ml-2 font-semibold text-lg'>{objectDetails.ratingsAverage}</div> 
                    </div>
                </div>
                <div className='mt-7 flex flex-col md:flex-row justify-center'>
                    <button 
                        onClick={() => handleAddProduct(objectDetails._id)} 
                        className='bg-[#508C9B] w-full md:w-[80%] rounded-xl py-2 mt-5 px-4 md:px-52 text-center'
                    >
                        + Add Product to Cart
                    </button>
                    <button aria-label="add to WishList" onClick={() => handleClick(objectDetails._id)} className='mt-4 md:mt-0 md:ml-36'>
                        <FavoriteIcon 
                            sx={{ 
                                fontSize: '32px',
                                color: wishlist[objectDetails._id] ? 'red' : 'inherit',
                            }} 
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
