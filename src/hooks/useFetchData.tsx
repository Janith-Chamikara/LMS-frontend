import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
// import useToastHook from "./useToast";

const useFetchData = (
  url: string,
) => {
  const [data, setData] = useState<object | null>(null);
  // const [newToast] = useToastHook();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(data,isLoading);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(url, {
          signal: controller.signal,
        });
        isMounted && setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error)
        
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return [ data,isLoading,setData ];
};

export default useFetchData;
