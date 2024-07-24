import axios from 'axios';

export const api = axios.create({
 baseURL: 'http://localhost:5022',
 transformRequest: [(data) => {
    if(data !== undefined){
    return data.data}}],
 headers: {
  //  'Accept': 'application/json',
   'Content-Type': 'multipart/form-data',
  //  'Access-Control-Allow-Origin': '*',
  //  'Access-Control-Allow-Methods':'GET, POST, OPTIONS',
  //  'Access-Control-Allow-Headers': 'Content-Type'
 }
});