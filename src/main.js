import { searchingRequest } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const loaderContainer = document.querySelector('.loader-container');
const imagesList = document.querySelector('.images-list');
const lightbox = new SimpleLightbox('.images-list a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let searchParam = {
  key: '45237174-16156409efac0dde2d7dc0545', 
  q: null,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 15,
};

let totalHits = 0;

const iziToastError = {
  message: 'Sorry, there are no images matching your search query. Please try again!',
  color: 'red',
  position: 'center',
  progressBar: false,
};

const iziToastWarning = {
  message: 'Please fill the search field',
  color: 'yellow',
  position: 'center',
  progressBar: false,
};

function showLoader() {
  loaderContainer.style.display = 'flex';
}

function hideLoader() {
  loaderContainer.style.display = 'none';
}

function resetSearch() {
  searchParam.page = 1;
  imagesList.innerHTML = '';
  loadMoreBtn.style.display = 'none';
}

function handleScroll() {
  const { height: cardHeight } = imagesList.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchParam.q = event.target.elements.search_key.value.trim();
  event.target.elements.search_key.value = '';

  if (!searchParam.q) {
    iziToast.warning(iziToastWarning);
    return;
  }

  resetSearch();
  showLoader();

  try {
    const imagesData = await searchingRequest(searchParam);
    if (imagesData.totalHits === 0) {
      iziToast.error(iziToastError);
      hideLoader();
      return;
    }

    totalHits = imagesData.totalHits;
    renderImages(imagesData);
    hideLoader();
    lightbox.refresh();

    if (searchParam.page * searchParam.per_page < totalHits) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
    hideLoader();
    iziToast.error({
      message: 'An error occurred. Please try again later.',
      color: 'red',
      position: 'center',
      progressBar: false,
    });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  searchParam.page += 1;
  showLoader();

  try {
    const imagesData = await searchingRequest(searchParam);
    renderImages(imagesData);
    hideLoader();
    lightbox.refresh();
    handleScroll();

    if (searchParam.page * searchParam.per_page >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        color: 'blue',
        position: 'center',
        progressBar: false,
      });
    }
  } catch (error) {
    console.error(error);
    hideLoader();
    iziToast.error({
      message: 'An error occurred. Please try again later.',
      color: 'red',
      position: 'center',
      progressBar: false,
    });
  }
});
