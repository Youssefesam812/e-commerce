import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import { Star } from '@mui/icons-material';
import { WishListContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import SmallSlider from './../SmallSlider/SmallSlider';
import img1 from '../../assets/images/4.jpg';
import img2 from '../../assets/images/5.jpg';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { Link } from 'react-router-dom';

function getProducts() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/products");
}

export default function Main() {
  const { wishlist, addWishList, removeWishList } = React.useContext(WishListContext);
  const { addProduct } = React.useContext(CartContext);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [loadingProduct, setLoadingProduct] = React.useState(null);

  const handleClick = async (productId, e) => {
    e.stopPropagation(); 
    if (wishlist[productId]) {
      const success = await removeWishList(productId); 
      if (success) {
        toast.error('Product Removed From Wishlist');
      } else {
        toast.error('Error removing from wishlist');
      }
    } else {
      const success = await addWishList(productId); 
      if (success) {
        toast.success('Product Added to Wishlist');
      } else {
        toast.error('Error adding to wishlist');
      }
    }
  };

  const handleAddProduct = async (e, id) => {
    e.preventDefault(); 
    setLoadingProduct(id); 
    try {
      const resFlag = await addProduct(id);
      if (resFlag) {   
        toast.success('Product Added Successfully', { position: 'top-right', duration: 3000 });
      } else {
        toast.error('Adding Product Error', { position: 'top-right', duration: 3000 });
      }
    } catch (error) {
      toast.error('Adding Product Error', { position: 'top-right', duration: 3000 });
    } finally {
      setLoadingProduct(null); 
    }
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: 'products',
    queryFn: getProducts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen bg-[#508C9B] flex justify-center items-center">
        <CircularProgress size={80} color="inherit" />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h2>Error: {error.message}</h2>
      </div>
    );
  }

  const filteredProducts = data?.data?.data?.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="px-11 pb-5 mt-24">
        <div className='flex items-center justify-center mb-10 mt-5'>
          <div className='w-[60%]  md:w-[30%]'>
            <SmallSlider />
          </div>
          <div className='w-[35%]'>
            <div>
              <img src={img1} alt="" className='w-full h-52'/>
            </div>
            <div>
              <img src={img2} alt="" className='w-full h-52'/>
            </div>
          </div>
        </div>
        <div className='w-[100%] md:w-[80%] m-auto mt-32'>
          <CategoriesSlider />
        </div>
      </div>

      <div className="mt-12 m-auto flex flex-col justify-center items-center">
        <div className="mb-8 text-center w-3/4">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 border border-gray-300 rounded-lg md:w-1/2 w-3/4 focus:outline-none focus:border-[#508C9B]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16 sm:w-11/12 justify-center">
          {filteredProducts.map((product) => (
            <div key={product._id} className="p-2">
              <Card  
                sx={{ 
                  maxWidth: 345,
                  height: {
                    xs: '680px',
                    md: '637px',
                  },
                  ":hover": {
                    boxShadow: '0px 0px 35px #508C9B',
                    cursor: 'pointer',
                  },
                  transition: '0.5s',
                  overflow: 'hidden',
                  position: 'relative',
                }} 
                className='group'
              >
                <Link to={`/productDetails/${product._id}`}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={product.imageCover}
                    alt={product.title}
                  />
                </Link>
                <CardContent>
                  <Typography variant="h6" sx={{color:'#677D6A'}}>{product.category.name}</Typography>
                  <Typography sx={{ fontWeight: 'bold', marginTop: '10px' }}>
                    {product.title.split(' ').slice(0, 2).join(' ')}
                  </Typography>
                  <div className='mt-2 flex justify-between'>
                    <div className='font-semibold text-lg'>{product.price} EG</div>
                    <div className='flex items-center'>
                      <Star sx={{ color: '#DAA520' }} />
                      <div className='mt-1 font-semibold text-lg'>{product.ratingsAverage}</div>
                    </div>
                  </div>
                </CardContent>
                <CardActions disableSpacing className='flex justify-between items-center'>
                  <div className='mt-[-30px] sm:mt-0'>
                    <button 
                      type="button" 
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#225f6e'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#508C9B'}
                      onClick={(e) => handleAddProduct(e, product._id)} 
                      className='text-white bg-[#508C9B] py-2 px-8 md:px-16 lg:px-10 rounded-lg'
                    >
                      {loadingProduct === product._id ? 'Loading...' : 'Add to Cart'}
                    </button>
                  </div>
                  <div>
                    <button 
                      onClick={(e) => handleClick(product._id, e)}
                      className={`text-red-400 bg-white p-2 rounded-full border-2 ${wishlist[product._id] ? 'border-red-400' : 'border-gray-300'} transition-all duration-200`}
                    >
                      <FavoriteIcon 
                      sx={{ 
                        fontSize: '25px',
                        
                        color: wishlist[product._id] ? 'red' : 'inherit',
                      }} 
                    />
                    </button>
                  </div>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
