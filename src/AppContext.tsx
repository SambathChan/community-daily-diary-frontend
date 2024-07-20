import { createContext, ReactNode, useState } from "react";
import { IPost } from "./models";
import { toast } from "./components/ui/use-toast";

type StateType = {
  error: string;
  loading: boolean;
  post: IPost | null;
  posts: IPost[];
};

const initialStateValue: StateType = {
  error: '',
  loading: false,
  post: null,
  posts: [],
};

type ContextType = {
  updateError: (error: string) => void;
  updateLoading: (loading: boolean) => void;
  updatePost: (post: IPost) => void;
  updatePosts: (posts: IPost[]) => void;
} & StateType;

const initialContextValue: ContextType = {
  ...initialStateValue,
  updateError: () => { },
  updateLoading: () => { },
  updatePost: () => { },
  updatePosts: () => { },
};


export const GlobalContext = createContext<ContextType>(initialContextValue);

export function AppContext({ children }: { children: ReactNode; }) {
  const [state, setState] = useState<StateType>(initialStateValue);

  const updatePost = (post: IPost) => {
    setState((prevState) => ({
      ...prevState,
      post: post
    }));
  };

  const updatePosts = (posts: IPost[]) => {
    setState((prevState) => ({
      ...prevState,
      posts
    }));
  };

  const updateLoading = (loading: boolean) => {
    setState((prevState) => ({
      ...prevState,
      loading
    }));
  };

  const updateError = (error: string) => {
    toast({ variant: "destructive", description: error });

    setState((prevState) => ({
      ...prevState,
      error
    }));
  };

  return (
    <GlobalContext.Provider value={
      {
        error: state.error,
        loading: state.loading,
        post: state.post,
        posts: state.posts,
        updateError,
        updateLoading,
        updatePosts,
        updatePost
      }
    }>
      {children}
    </GlobalContext.Provider >
  );
}