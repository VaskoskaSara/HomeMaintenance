import { api } from "../axiosInstance";

export const getFetcher = async (url: string) => {
   var response = await api.get(url);
   console.log(response);
   return response;
};
