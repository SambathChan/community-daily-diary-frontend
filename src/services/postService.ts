import { IPost } from "../models";
import { format } from "date-fns";

const { VITE_API_URL } = import.meta.env;
const BASE_URL = `${VITE_API_URL}/posts`;

type ErrorResponse = {
  message: string;
};

export const createPost = async (post: IPost): Promise<IPost | undefined> => {
  const response: Response = await fetch(BASE_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    });
  if (response.ok) {
    const responseBody: IPost = await response.json();
    return responseBody;
  } else {
    const responseBody: ErrorResponse = await response.json();
    throw new Error(responseBody.message);
  }
};

export const getPosts = async (date: string): Promise<IPost[]> => {
  try {
    const response: Response = await fetch(`${BASE_URL}/${date}`);
    const responseBody: IPost[] = await response.json();
    return responseBody;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getSinglePost = async (date: string, id: string): Promise<IPost | undefined> => {
  try {
    const response: Response = await fetch(`${BASE_URL}/${date}/${id}`);
    const responseBody: IPost = await response.json();
    return responseBody;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const voteSinglePost = async (date: Date, id: string, voteUp: boolean): Promise<number> => {
  try {
    const reponse = await fetch(`${BASE_URL}/${format(date, 'MM-dd-yyyy')}/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteUp: voteUp })
      });
    const responseBody: number = await reponse.json();
    return responseBody;
  } catch (error) {
    console.log(error);
    return 0;
  }
};