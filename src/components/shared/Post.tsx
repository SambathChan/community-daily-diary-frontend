import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useContext, useState } from "react";

import Autolinker from 'autolinker';
import { Button } from "../ui/button";
import DOMPurify from 'dompurify';
import { GlobalContext } from "../../AppContext";
import { IPost } from "../../models";
import { Link } from "react-router-dom";
import { getDateDifferenceFromNow } from "../../lib/date.utils";
import { voteSinglePost } from "../../services/postService";

export type PostProps = {
  post: IPost;
  single: boolean;
};

function Post({ post, single }: PostProps) {
  const { title, body, vote, createdAt, _id } = post;
  const { posts, updatePosts, updatePost } = useContext(GlobalContext);

  const [downVoteTrigger, setDownVoteTrigger] = useState(false);
  const [upVoteTrigger, setUpVoteTrigger] = useState(false);
  const [voting, setVoting] = useState(false);

  const handleVoteUp = async () => {
    if (_id) {
      setVoting(prev => !prev);
      const votes = await voteSinglePost(_id, true);
      updateVote(votes);
      if (!upVoteTrigger) {
        setUpVoteTrigger(() => true);
        setDownVoteTrigger(() => false);
      }
      setVoting(prev => !prev);
    }
  };

  const handleVoteDown = async () => {
    if (_id) {
      setVoting(prev => !prev);
      setVoting(true);
      const votes = await voteSinglePost(_id, false);
      updateVote(votes);
      if (!downVoteTrigger) {
        setDownVoteTrigger(() => true);
        setUpVoteTrigger(() => false);
      }
      setVoting(prev => !prev);
    }
  };

  const updateVote = (votes: number) => {
    if (single) {
      updatePost({ ...post, vote: votes });
    } else {
      updatePosts(
        posts.map((p) => {
          if (p._id === _id) {
            return { ...p, vote: votes };
          }
          return p;
        })
      );
    }
  };

  const getCleanBody = () => {
    return { __html: Autolinker.link(DOMPurify.sanitize(body), { newWindow: true }) };
  };

  return (
    <Card className="p-2 sm:w-[600px] lg:w-[750px]">
      <CardHeader>
        <CardTitle className="leading-8">{title}</CardTitle>
        <CardDescription>
          <Link to={`/post/${_id}`}>{getDateDifferenceFromNow(createdAt!)}</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="flex-1">
          <p className="whitespace-break-spaces post-text" dangerouslySetInnerHTML={getCleanBody()}></p>
        </div>
        <div className="flex flex-col">
          <div className="mt-3 mx-2">
            <Button onClick={handleVoteUp} disabled={voting ? true : false} variant="outline" size="icon">
              <ChevronUp className="h-4 w-4" />
            </Button>
            <div key={vote} className={
              `text-center text-xl font-semibold my-2 
              ${vote! < 0 ? "text-red-600" : ""} 
              ${downVoteTrigger ? "animate-slide-in" : ""}
              ${upVoteTrigger ? "animate-slide-out" : ""}`
            }>{vote}</div>
            <Button onClick={handleVoteDown} disabled={voting ? true : false} variant="outline" size="icon">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { Post };