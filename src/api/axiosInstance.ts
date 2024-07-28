import axios from 'axios';

export const apiPost = axios.create({
 baseURL: 'https://localhost:7029',
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

export const apiJson = axios.create({
   baseURL: 'https://localhost:7029',
   transformRequest: [(data) => {
      if(data !== undefined){
      return JSON.stringify(data.data); }}],
   headers: {
    //  'Accept': 'application/json',
     'Content-Type': 'application/json',
    //  'Access-Control-Allow-Origin': '*',
    //  'Access-Control-Allow-Methods':'GET, POST, OPTIONS',
    //  'Access-Control-Allow-Headers': 'Content-Type'
   }
  });