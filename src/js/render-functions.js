const imagesList = document.querySelector('.images-list');

export function renderImages(imagesData) {
  const markUp = imagesData.hits
    .map(image => {
      return `
        <li class="images-item">
            <a href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}" width="360" height="202">
            </a>

            <div class="images-titles">
                <p><b>Likes</b> ${image.likes}</p>
                <p><b>Views</b> ${image.views}</p>
                <p><b>Comments</b> ${image.comments}</p>
                <p><b>Downloads</b> ${image.downloads}</p>
            </div>
        </li>
        `;
    })
    .join('');
  imagesList.insertAdjacentHTML('beforeend', markUp);
}