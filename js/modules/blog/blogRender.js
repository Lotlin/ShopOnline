import {createElement} from '../service.js';
import {loadBlogData} from './blogGetData.js';
import {PAGINATION_PAGES_NUM} from './blogData.js';
import {isFirstPage, makePaginationElemActive} from './blogService.js';
import {blogList, paginationList} from './blogGetElements.js';

const renderBlogItem = (
    id = 1,
    titleText = '',
    imgName = 'no-foto',
    width = 195,
    height = 195,
) => {
  const li = createElement('li', {
    'className': 'blog__item',
  });

  const linkImg = createElement('a', {
    'className': 'blog__link blog__link--img',
    'href': `article.html?id=${id}`,
  });

  const picture = createElement('picture');

  const source1 = createElement('source', {
    'srcset': `img/blog/${imgName}.avif`,
    'type': 'image/avif',
  });

  const source2 = createElement('source', {
    'srcset': `img/blog/${imgName}.webp`,
    'type': 'image/webp',
  });

  const img = createElement('img', {
    'className': 'blog__img',
    'src': `img/blog/${imgName}.jpg`,
    width,
    height,
  });

  picture.append(source1, source2, img);
  linkImg.append(picture);

  const linkTitle = createElement('a', {
    'className': 'blog__link',
    'href': `article.html?id=${id}`,
  });

  const title = createElement('h2', {
    'className': 'blog__title',
    'textContent': titleText,
  });

  linkTitle.append(title);

  li.append(linkImg, linkTitle);

  return li;
};

export const renderBlogList = async (pageNumber = 1) => {
  blogList.textContent = '';

  const blodData = (await loadBlogData(pageNumber)).blogData;

  blodData.forEach(element => {
    const li = renderBlogItem(element.id, element.title, element.img);

    blogList.append(li);
  });
};

const renderPaginationItem = (pageNumber) => {
  const li = createElement('li', {
    'className': 'pagination__number',
    'textContent': pageNumber,
  });

  if (isFirstPage(pageNumber)) {
    makePaginationElemActive(li);
  }

  const link = createElement('a', {
    'className': 'pagination__link',
    'href': 'blog.html',
  });

  if (!isFirstPage(pageNumber)) {
    link.href = `blog.html?page=${pageNumber}`;
  }

  li.append(link);

  return li;
};

export const renderPagination =
  async (pageNumber = 1, elemAmount = PAGINATION_PAGES_NUM) => {
    paginationList.textContent = '';

    const totalPages = (await loadBlogData()).totalPages;

    for (let i = 0; i < elemAmount; i++) {
      const paginationItem = renderPaginationItem(pageNumber);

      if (pageNumber > totalPages) {
        return;
      }

      pageNumber++;

      paginationList.append(paginationItem);
    }
  };
