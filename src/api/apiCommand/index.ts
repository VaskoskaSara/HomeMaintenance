import { api } from "../axiosInstance";

export const  postFetcher = async(url: string, { arg }: { arg: any }) => {
   var response = await api.post(url,{data: arg}).catch((error) => console.error('Error:', error));
   console.log(response);
};
