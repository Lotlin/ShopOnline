import {
  createElement, delLastPeriodStr, splitStrIntoParagraphs, getUrlGetParam,
} from '../service.js';
import {
  articleCrumbsContainer, articleContainer,
} from './articleGetElements.js';
import {
  loadArticleData, loadAutorData,
} from './articleGetData.js';

const renderArticleCrumbsElem = async (articleTitle, articleId) => {
  const crumbElem = createElement('p', {
    className: 'crumbs__elem',
  });

  const link = createElement('a', {
    className: 'crumbs__link',
    href: `article.html?id=${articleId}`,
    textContent: `${articleTitle}`,
  });

  crumbElem.append(link);
  articleCrumbsContainer.append(crumbElem);
};

const renderArticle = async (dbTitle = '', dbText = '', dbAutorId = '') => {
  const autorName = await loadAutorData(dbAutorId);
  const articleTexParagraphstArr = splitStrIntoParagraphs(dbText);

  const articleTitle = createElement('h1', {
    className: 'article__title',
    textContent: `${dbTitle}`,
  });

  const articleText = createElement('div', {
    className: 'article__text',
  });

  articleTexParagraphstArr.forEach(paragraph => {
    const p = createElement('p', {
      className: 'article__paragraph',
      textContent: `${paragraph}`,
    });

    articleText.append(p);
  });

  const articleSignatureWrapper = createElement('div', {
    className: 'article__signature',
  });

  const returnBlogLink = createElement('a', {
    className: 'article__link-return',
    href: 'blog.html',
    textContent: 'К списку статей',
  });

  const autor = createElement('p', {
    className: 'article__autor',
    textContent: autorName !== undefined ? `${autorName}` : 'Автор неизвестен',
  });

  articleSignatureWrapper.append(returnBlogLink, autor);

  articleContainer.append(articleTitle, articleText, articleSignatureWrapper);
};

export const renderArticlePage = async () => {
  const articleId = getUrlGetParam();
  const dbArticleData = await loadArticleData(articleId);
  const dbArticleTitle = dbArticleData.title;
  const dbAutorId = dbArticleData.userId;

  const articleTitle = delLastPeriodStr(dbArticleTitle);
  const articleText = dbArticleData.body;

  renderArticleCrumbsElem(articleTitle, articleId);
  renderArticle(articleTitle, articleText, dbAutorId);
};
