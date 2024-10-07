import { API } from "../configurations/configuration";
import httpClient from "../configurations/httpClient";
import { getToken } from "./localStorageService";

export const createEvent = async (eventData) => {
  const response = await httpClient.post(API.POST,{ eventData,
    headers: {
        Authorization: `Bearer ${getToken()}`,
      }});
    
  return response.result;
};