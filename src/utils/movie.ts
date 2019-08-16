import * as moment from "moment";

export const formatDate = (releaseDate: string) => {
  return moment(releaseDate, "YYYY-MM-DD").format("MMM DD, YYYY");
};

export const convertMinsToHoursAndMins = (minutes: number) => {
  let h = Math.floor(minutes / 60);
  let m: any = minutes % 60;
  h = h < 10 ? h : h;
  m = m < 10 ? "0" + m : m;
  return h + "h " + m + "m";
};

export const getPathColor = (voteAverage: number) => {
  if (voteAverage > 7) {
    return `rgba(32, 232, 132, ${voteAverage / 10})`;
  } else if (voteAverage > 5) {
    return `rgba(255, 195, 0, ${voteAverage / 10})`;
  } else {
    return `rgba(169, 50, 38, ${voteAverage / 10})`;
  }
};
