import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
import { getDateDifferenceFromNow } from "../../lib/date.utils";
import { IPost } from "../../models";
import { format } from "date-fns";
import { useContext, useState } from "react";
import { GlobalContext } from "../../AppContext";
import { voteSinglePost } from "../../services/postService";
import Autolinker from 'autolinker';
import DOMPurify from 'dompurify';

export type PostProps = {
  post: IPost;
  single: boolean;
};

function Post({ post, single }: PostProps) {
  const { title, body, vote, createdAt, uuid } = post;
  const { posts, updatePosts, updatePost } = useContext(GlobalContext);

  const [downVoteTrigger, setDownVoteTrigger] = useState(false);
  const [upVoteTrigger, setUpVoteTrigger] = useState(false);
  const [voting, setVoting] = useState(false);

  const handleVoteUp = async () => {
    if (createdAt && uuid) {
      setVoting(prev => !prev);
      const votes = await voteSinglePost(createdAt, uuid, true);
      updateVote(votes);
      if (!upVoteTrigger) {
        setUpVoteTrigger(() => true);
        setDownVoteTrigger(() => false);
      }
      setVoting(prev => !prev);
    }
  };

  const handleVoteDown = async () => {
    if (createdAt && uuid) {
      setVoting(prev => !prev);
      setVoting(true);
      const votes = await voteSinglePost(createdAt, uuid, false);
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
          if (p.uuid === uuid) {
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
          <Link to={`/posts/${format(createdAt!, 'MM-dd-yyyy')}/${uuid}`}>{getDateDifferenceFromNow(createdAt!)}</Link>
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