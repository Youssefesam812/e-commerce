
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';  

export default function useAllCategories() {

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: 'allCategories',
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });


  return { isError, isLoading, data };
}
