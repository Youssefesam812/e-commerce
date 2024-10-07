import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CircularProgress } from '@mui/material';
import axios from 'axios';
import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';

function getCategories() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
}

function getSubCateg(id) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
}

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['allCategories'],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isError) {
    return <h2>Error</h2>;
  }

  if (isLoading) {
    return (
      <div className="h-screen bg-[#508C9B] flex justify-center items-center">
        <CircularProgress size={80} color="inherit" />
      </div>
    );
  }

  const handleCategoryClick = async (category) => {
    setIsLoadingGlobal(true); 
    try {
      const { data } = await getSubCateg(category._id);
      setSubCategories(data.data);
      setSelectedCategory(category);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setIsLoadingGlobal(false); 
    }
  };

  const categories = data?.data?.data || [];

  return (
    <>
      {isLoadingGlobal && (
        <div className="fixed inset-0 bg-[#508c9b45] flex justify-center items-center z-50">
          <CircularProgress size={80} color="inherit" />
        </div>
      )}

      <div className="px-24 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 mb-16 justify-center mt-9 ">
        {categories.map((categ) => (
          <Card
            key={categ._id}
            sx={{
              width:{  xs: 300, 
                sm: 400, },
              marginTop: '30px',
              backgroundColor: 'white',
              ':hover': {
                boxShadow: '0px 0px 35px #508C9B',
                cursor: 'pointer',
              },
            }}
            onClick={() => handleCategoryClick(categ)}
          >
            <AspectRatio minHeight="420px" maxHeight="500px">
              <img src={categ.image} loading="lazy" alt={categ.name} />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <div className="text-center p-6 m-auto">
                <Typography level="body-xs" sx={{ fontSize: '22px', color: '#134B70' }}>
                  {categ.name}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            width: { xs: '90%', md: '500px' },
            backgroundColor: 'white',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <ModalClose
            variant="plain"
            sx={{ m: 1 }}
            onClick={() => setIsModalOpen(false)}
          />
          <h2 className="text-3xl text-center mt-12 text-[#275f6d]">
            {selectedCategory?.name} SubCategories
          </h2>

          <div className="mt-4">
            {subCategories.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center p-2">
                {subCategories.map((subCateg) => (
                  <div key={subCateg._id} className="p-4 bg-slate-800 text-center rounded-lg mt-3">
                    <h4 className="text-white">{subCateg.name}</h4>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-7">No subcategories found.</p>
            )}
          </div>
        </Sheet>
      </Modal>
    </>
  );
}
