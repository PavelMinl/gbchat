import {FETCH_STATUSES} from "../../utils/constans";


export const selectArticles = (state) => state.articles.data;
export const selectArticlesLoading = (state) =>
  state.articles.status === FETCH_STATUSES.REQUEST;
export const selectError = (state) => state.articles.error;
