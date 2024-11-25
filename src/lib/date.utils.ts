import { differenceInDays, differenceInHours, differenceInMinutes, parse, startOfToday } from "date-fns";

export const getDateDifferenceFromNow = (date: Date) => {
  const currentDate = new Date();
  const minutes = differenceInMinutes(currentDate, date);
  const hours = differenceInHours(currentDate, date);
  const days = differenceInDays(currentDate, date);
  if (minutes < 1) {
    return "Just now";
  }
  else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 7) {
    return `${days}d ago`;
  } else {
    return (new Date(date)).toLocaleDateString();
  }
};

export const parseDate = (paramDate: string) => {
  const today = startOfToday();
  return parse(paramDate, 'MM-dd-yyyy', today);
};