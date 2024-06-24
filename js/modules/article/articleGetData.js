import {fetchRequest} from '../service.js';
import {ARTICLE_API_URL, AUTOR_API_URL} from './articleData.js';


export const loadArticleData = async (linkId) => {
  const fetchData = await fetchRequest(`${ARTICLE_API_URL}/${linkId}`, {});
  const articleData = fetchData.data;

  return {
    title: articleData.title,
    body: articleData.body,
    userId: articleData.user_id,
  };
};

export const loadAutorData = async (userId) => {
  const fetchData = await fetchRequest(`${AUTOR_API_URL}/${userId}`, {});
  const autorData = fetchData.data.name;

  return autorData;
};
