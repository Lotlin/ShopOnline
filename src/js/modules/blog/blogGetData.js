import {fetchRequest} from '../service.js';
import {isFirstPage} from './blogService.js';
import {BLOG_API_URL} from './blogData.js';

export const loadBlogData = async (pageNumber = 1) => {
  let fetchData = '';
  if (isFirstPage(pageNumber)) {
    fetchData = await fetchRequest(BLOG_API_URL, {});
  } else {
    fetchData = await fetchRequest(`${BLOG_API_URL}?page=${pageNumber}`, {});
  }

  const blogData = fetchData.data;
  const totalPages = fetchData.meta.pagination.pages;

  return {
    blogData,
    totalPages,
  };
};
