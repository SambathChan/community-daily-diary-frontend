import { Link, NavLink } from "react-router-dom";

import diaryLogo from '/diary.svg';
import { Button } from "../ui/button";
import { Home } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 shadow-sm bg-white h-16">
      <div className="flex justify-between mx-5 h-full">
        <div className="flex w-32">
          <div className="flex flex-col my-auto">
            <Link to="/" reloadDocument>
              <div className="flex">
                <img src={diaryLogo} alt="logo" className="h-[56px] p-2" />
                <span className="text-red-500 mt-1 font-bold">Community Daily Diary</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="my-auto">
          <NavLink to="/" reloadDocument>
            <Button variant="ghost" size="icon">
              <Home className="h-6 w-6" />
            </Button>
          </NavLink>
        </div>
        <div className="my-auto w-32 text-right">
          <Button asChild>
            <Link to="/posts/create">Create Post</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export { Header };