import { IPost } from "../../models";
import { Post } from "./index";
import sadIcon from "../../assets/sad.svg";

type PostsProps = {
  posts: IPost[];
};

function Posts({ posts }: PostsProps) {
  return (
    <div className="flex flex-col gap-5">
      {
        posts.length ?
          (posts.map((post) => (
            <Post key={post._id} post={post} single={false} />
          ))) :
          <div className="p-2 sm:w-[600px] lg:w-[750px] text-center text-red-500">
            <h4 className="my-5">There are no posts to display</h4>
            <img className="mx-auto" width={50} src={sadIcon} alt="sad face" />
          </div>
      }
    </div>
  );
}

export { Posts };