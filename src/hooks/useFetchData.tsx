import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useToastHook from "./useToast";

const useFetchData = (
  url: string,
) => {
  const [data, setData] = useState({});
  const [newToast] = useToastHook();
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
        newToast({ condition: "error", message: error.message });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);

  return { data,isLoading };
};

export default useFetchData;
