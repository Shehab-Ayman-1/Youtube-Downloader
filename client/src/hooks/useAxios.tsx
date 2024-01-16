import { useEffect, useState } from "react";
import { routes } from "@/constants";
import axios from "axios";
import type { AxiosError, AxiosResponse, AxiosInstance } from "axios";

let router: AxiosInstance;
if (import.meta.env.MODE === "production") router = axios.create(routes.remote);
else router = axios.create(routes.locale);

type RequestResult<Data> = {
   data: Data | undefined;
   loading: boolean;
   error: string;
   isSubmitted: boolean;
};

type Method = "get" | "post" | "put" | "delete";
export const useAxios = <Data,>(method?: Method, url?: string, body?: object, options?: object) => {
   const [data, setData] = useState<Data>();
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const fetcher = async (
      method?: Method,
      url: string = "",
      body?: object,
      options?: object,
   ): Promise<RequestResult<Data>> => {
      if (!method || url === "/") return { data, loading, error, isSubmitted };

      setLoading(true);
      setIsSubmitted(false);
      setError("");

      try {
         let response: AxiosResponse;

         if (method === "get") response = await router.get(url, options);
         else response = await router[method](url, body, options);

         let data = response.data;
         setData(data);

         return { data, error, isSubmitted: true, loading: false };
      } catch (reason) {
         const error = reason as AxiosError;
         const err = (error?.response?.data as any).error || error?.message || "Network Error";

         setError(err);

         console.log(error);
         return { data: undefined, loading: false, error: err, isSubmitted: true };
      } finally {
         setLoading(false);
         setIsSubmitted(true);
      }
   };

   useEffect(() => {
      fetcher(method, url, body, options);
   }, [method, url, body, options]);

   const refetch = async (method?: Method, url?: string, body?: object, options?: object) =>
      await fetcher(method, url, body, options);

   return { data, loading, error, isSubmitted, status, refetch };
};
