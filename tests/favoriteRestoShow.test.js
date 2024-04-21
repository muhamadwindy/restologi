import FavoriteRestoView from '../src/scripts/views/pages/liked-resto/favorite-resto-view';
import FavoriteRestoShowPresenter from '../src/scripts/views/pages/liked-resto/favorite-resto-show-presenter';

describe('Showing all favorite resto', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestoView();
    document.body.innerHTML = view.getTemplate();
  };
  beforeEach(() => {
    renderTemplate();
  });

  describe('When no resto have been liked', () => {
    it('should ask for the favorite resto', () => {
      const favoriteResto = {
        getAll: jest.fn().mockImplementation(() => []),
      };
      new FavoriteRestoShowPresenter({
        view,
        favoriteResto: favoriteResto,
      });
      expect(favoriteResto.getAll).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no resto have been liked', (done) => {
      document
        .querySelector('.resto-container')
        .addEventListener('resto:updated', () => {
          expect(
            document.querySelectorAll('.resto-item__not__found').length
          ).toEqual(1);
          done();
        });

      const favoriteResto = {
        getAll: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestoShowPresenter({
        view,
        favoriteResto,
      });
    });
  });
  describe('When favorite resto exist', () => {
    it('should show the resto', (done) => {
      document
        .querySelector('.resto-container')
        .addEventListener('resto:updated', () => {
          expect(document.querySelectorAll('.resto-item').length).toEqual(2);
          done();
        });
      const favoriteResto = {
        getAll: jest.fn().mockImplementation(() => [
          {
            id: 11,
            name: 'Sebuah resto A',
          },
          {
            id: 22,
            name: 'Sebuah resto B',
          },
        ]),
      };
      new FavoriteRestoShowPresenter({
        view,
        favoriteResto,
      });
    });
  });
});
