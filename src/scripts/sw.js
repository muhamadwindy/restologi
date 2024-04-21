/* eslint-disable */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);
/* eslint-disable */

const listRestoApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/list'),
  new StaleWhileRevalidate({
    cacheName: 'list-resto-api',
  })
);

const imageResto = new Route(
  ({ url }) =>
    url.href.startsWith('https://restaurant-api.dicoding.dev/images/'),
  new StaleWhileRevalidate({
    cacheName: 'image-resto',
  })
);

registerRoute(listRestoApi);
registerRoute(imageResto);
