import { Gallery } from './image-list.js';

const statusTag = document.getElementById('status-tag');

const logOnScreen = (text) => {
  const textNode = document.createTextNode(text);
  statusTag.appendChild(textNode);
};

logOnScreen('checking if js change works v4');

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    logOnScreen('registering serviceWorker');
    try {
      const registration = await navigator.serviceWorker.register('sw.js');
      if (registration.installing) {
        logOnScreen('Service worker installing');
      } else if (registration.waiting) {
        logOnScreen('Service worker installed');
      } else if (registration.active) {
        logOnScreen('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  } else {
    logOnScreen('serviceWorker Not found');
  }
};

const imgSection = document.querySelector('section');

const getImageBlob = async (url) => {
  const imageResponse = await fetch(url);
  if (!imageResponse.ok) {
    throw new Error(
      `Image didn't load successfully; error code: ${
        imageResponse.statusText || imageResponse.status
      }`
    );
  }
  return imageResponse.blob();
};

const createGalleryFigure = async (galleryImage) => {
  try {
    const imageBlob = await getImageBlob(galleryImage.url);
    const myImage = document.createElement('img');
    const myCaption = document.createElement('caption');
    const myFigure = document.createElement('figure');
    myCaption.textContent = `${galleryImage.name}: Taken by ${galleryImage.credit}`;
    myImage.src = window.URL.createObjectURL(imageBlob);
    myImage.setAttribute('alt', galleryImage.alt);
    myFigure.append(myImage, myCaption);
    imgSection.append(myFigure);
  } catch (error) {
    logOnScreen(JSON.stringify(error));
  }
};

registerServiceWorker();
Gallery.images.map(createGalleryFigure);
