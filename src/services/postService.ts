import axios, { AxiosError } from "axios";

import { IPost } from "../models";
import { axiosConfig } from "@/config";

const { VITE_API_URL } = import.meta.env;
const BASE_URL = `${VITE_API_URL}/posts`;

export const createPost = async (post: IPost): Promise<IPost | undefined> => {
  try {
    const response = await axios.post<IPost>(BASE_URL, post, axiosConfig);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
};

export const getPosts = async (date: string): Promise<IPost[]> => {
  try {
    const response = await axios.get<IPost[]>(`${BASE_URL}?date=${date}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getSinglePost = async (id: string): Promise<IPost | undefined> => {
  try {
    const response = await axios.get<IPost>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const voteSinglePost = async (id: string, voteUp: boolean): Promise<number> => {
  try {
    var data = {
      voteUp: voteUp
    };
    const response = await axios.patch<number>(`${BASE_URL}/${id}`, data, axiosConfig);
    return response.data;
  } catch (error) {
    console.log(error);
    return 0;
  }
};