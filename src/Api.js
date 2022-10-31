import axios from "axios";

export const Api = "http://52.186.102.117/permits-service/v1/";

// export const client = axios.create({
//     baseURL: "https://jsonplaceholder.typicode.com/posts" 
//   });

export const AerialActivityUrl = "http://52.186.102.117/permits-service/v1/aerial-activity";
export const ShipCrossUrl = "http://52.186.102.117/permits-service/v1/ship";
export const AerialPhotoUrl = "http://52.186.102.117/permits-service/v1/aerial-photo";
export const ApiCraneUrl = "http://52.186.102.117/permits-service/v1/crane";

export const instance = axios.create({
    baseURL: Api,
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    // .. other options
  });