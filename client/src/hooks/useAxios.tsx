import type { AxiosResponse, AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { routes } from "@/constants";
import axios from "axios";

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
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState<Data>();
   const [error, setError] = useState("");

   const fetcher = async (
      method?: Method,
      url: string = "",
      body?: object,
      options?: object,
   ): Promise<RequestResult<Data>> => {
      if (!method || url === "/") return { data, loading, error, isSubmitted };

      setIsSubmitted(false);
      setLoading(true);
      setError("");

      try {
         let response: AxiosResponse;

         if (method === "get") response = await router.get(url, options);
         else response = await router[method](url, body, options);

         const data = response.data;
         setData(data);

         return { data, error, isSubmitted: true, loading: false };
      } catch (error: any) {
         const reason = error?.response?.data?.error || error?.message || "Network Error";
         console.log(reason);

         setError(reason);
         return { data: undefined, loading: false, error: reason, isSubmitted: true };
      } finally {
         setIsSubmitted(true);
         setLoading(false);
      }
   };

   useEffect(() => {
      fetcher(method, url, body, options);
   }, [method, url, body, options]);

   const refetch = async (method?: Method, url?: string, body?: object, options?: object, reset?: boolean) => {
      if (reset) setData(undefined);
      await fetcher(method, url, body, options);
   };

   return { data, loading, error, isSubmitted, status, refetch };
};
