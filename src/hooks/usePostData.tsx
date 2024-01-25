import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
// import useToastHook from "./useToast";

const usePostData = (url: string, body: object) => {
  const [data, setData] = useState();
  // const [newToast] = useToastHook();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(data, isLoading);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const uploadData = async () => {
      try {
        const response = await axiosPrivate.post(url, body, {
          signal: controller.signal,
        });
        isMounted && setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    uploadData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);

  return [data, isLoading, setData];
};

export default usePostData;
