import * as moment from "moment";

export const formatDate = (releaseDate: string) => {
  return moment(releaseDate, "YYYY-MM-DD").format("MMM DD, YYYY");
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
