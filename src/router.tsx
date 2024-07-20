import { createBrowserRouter } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import Layout from "./components/layout";
import { CreatePost, Home, ViewPost } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />, //current date
      }, {
        path: "posts/:date",
        element: <Home />, //by date
      },
      {
        path: "posts/:date/:id",
        element: <ViewPost />, //by date and id
      },
      {
        path: "posts/create",
        element: <CreatePost />,
      }
    ],
    errorElement: <NotFound />,
  },
]);

export default router;