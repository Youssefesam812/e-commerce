import axios from 'axios';
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';

function getBrands() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
}

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = React.useState(null);

  const { data, isError, isLoading } = useQuery({
    queryKey: 'allBrands',
    queryFn: getBrands,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isError) {
    return (
      <>
        <h2>Error</h2>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <div className="h-screen bg-[#508C9B] flex justify-center items-center">
          <CircularProgress size={80} color="inherit" />
        </div>
      </>
    );
  }

  return (
    <>
    <h2 className="text-5xl text-center mt-12 text-[#275f6d]">All Brands</h2>

      <div className="px-24 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 gap-x-12 mb-16 justify-center mt-9 ">
        {data.data.data.map((product) => (
          <Card
            key={product._id}
            sx={{ width: 320, marginTop: '30px', backgroundColor: 'white' ,
                 ":hover": {
                boxShadow: '0px 0px 35px #508C9B',
                cursor: 'pointer',
              },
            }}
            onClick={() => setSelectedBrand(product)} 
          >
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img src={product.image} loading="lazy" alt={product.name} />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <div className="text-center">
                <Typography level="body-xs" sx={{ fontSize: '22px', color: 'black' }}>
                  {product.name}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedBrand && (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={!!selectedBrand} 
          onClose={() => setSelectedBrand(null)} 
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}
        >
          <Sheet
            variant="outlined"
            sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg',
              width: {
                xs: '80%',  
                md: '500px', 
            },
              backgroundColor:"white" }}
          >
            <ModalClose
              variant="plain"
              sx={{ m: 1 }}
              onClick={() => setSelectedBrand(null)} 
            />
            <h2 className="text-5xl text-center mt-12 text-[#275f6d]">{selectedBrand.name}</h2>
            <div className=" py-4">
              <AspectRatio minHeight="120px" maxHeight="200px">
                <img src={selectedBrand.image} loading="lazy" alt={selectedBrand.name} />
              </AspectRatio>
            </div>
          </Sheet>
        </Modal>
      )}
    </>
  );
}
