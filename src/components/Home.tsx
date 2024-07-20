import { Button } from "@/components/ui/button";
import { DatePicker, Posts } from "./shared";
import { useContext, useEffect } from "react";
import { getPosts } from "../services/postService";
import { addDays, format, isEqual, startOfToday, subDays } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { parseDate } from "../lib/date.utils";
import { GlobalContext } from "../AppContext";
import { SkeletonCard } from "./shared/SkeletonCard";

function Home() {
  const { date = format(startOfToday(), 'MM-dd-yyyy') } = useParams<{ date: string; }>();
  const navigate = useNavigate();

  const { posts, loading, updateLoading, updatePosts } = useContext(GlobalContext);

  useEffect(() => {
    (async () => {
      updateLoading(true);

      const posts = await getPosts(date);
      updatePosts(posts);
      updateLoading(false);
    })();
  }, [date]);

  const handleNextDay = () => {
    if (!isEqual(date, startOfToday())) {
      handleNavigation(addDays(date, 1));
    }
  };

  const handlePreviousDay = () => {
    handleNavigation(subDays(date, 1));
  };

  const handleDateChange = (day: Date | undefined) => {
    if (day) {
      handleNavigation(day);
    }
  };

  const handleNavigation = (date: Date) => {
    if (isEqual(date, startOfToday())) {
      navigate(`/`);
    } else {
      navigate(`/posts/${format(date, 'MM-dd-yyyy')}`);
    }
  };

  return (
    <div className="my-5 mx-5 sm:mx-auto">
      <div className="flex gap-5 justify-between mb-5">
        <Button variant="outline" className="w-32" onClick={handlePreviousDay}>Previous Day</Button>
        <DatePicker date={parseDate(date)} onChange={handleDateChange} />
        <Button variant="outline" className="w-32" disabled={isEqual(date, startOfToday())} onClick={handleNextDay}>Next Day</Button>
      </div>
      {
        loading && (
          <div className="flex flex-col gap-5">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )
      }
      {
        !loading && (
          <Posts posts={posts} />
        )
      }
    </div>
  );
}

export { Home };
