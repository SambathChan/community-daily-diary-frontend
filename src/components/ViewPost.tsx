import { Post } from "./shared";
import { useContext, useEffect } from "react";
import { getSinglePost } from "../services/postService";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../AppContext";
import { SkeletonCard } from "./shared/SkeletonCard";

function ViewPost() {
  const { id } = useParams<{ id: string; }>();
  const { post, loading, updateLoading, updatePost } = useContext(GlobalContext);

  useEffect(() => {
    void (async () => {
      if (id) {
        updateLoading(true);

        const data = await getSinglePost(id);

        if (data) {
          updatePost(data);
        }
        updateLoading(false);
      }
    })();
  }, []);

  return (
    <div className="my-5 mx-0 sm:mx-auto">
      {
        (!loading && post) && (
          <Post post={post} single={true} />
        )
      }
      {
        loading && (
          <SkeletonCard />
        )
      }
    </div>
  );
}

export { ViewPost };
