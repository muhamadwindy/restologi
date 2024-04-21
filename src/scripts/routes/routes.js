import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';
import Listing from '../views/pages/listing';

const routes = {
  '/': Listing,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
