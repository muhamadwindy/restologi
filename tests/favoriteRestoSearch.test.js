import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-resto/favorite-resto-search-presenter';
import FavoriteRestoView from '../src/scripts/views/pages/liked-resto/favorite-resto-view';

describe('Searching resto', () => {
  let presenter;
  let favoriteResto;
  let view;

  const search = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };
  const setRestoSearchContainer = () => {
    view = new FavoriteRestoView();
    document.body.innerHTML = view.getTemplate();
  };
  const constructPresenter = () => {
    favoriteResto = {
      getAll: jest.fn(),
      search: jest.fn(),
    };
    presenter = new FavoriteRestoSearchPresenter({
      favoriteResto,
      view,
    });
  };

  beforeEach(() => {
    setRestoSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteResto.search.mockImplementation(() => []);
      search('resto a');
      expect(presenter.latestQuery).toEqual('resto a');
    });
    it('should ask the model to search for liked resto', () => {
      favoriteResto.search.mockImplementation(() => []);
      search('resto a');
      expect(favoriteResto.search).toHaveBeenCalledWith('resto a');
    });
    it('should show the resto found by Favorite Resto', (done) => {
      document
        .querySelector('.resto-container')
        .addEventListener('resto:updated', () => {
          expect(document.querySelectorAll('.resto-item').length).toEqual(3);
          done();
        });
      favoriteResto.search.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, name: 'resto abc' },
            { id: 222, name: 'ada juga resto abcde' },
            { id: 333, name: 'ini juga boleh resto a' },
          ];
        }
        return [];
      });
      search('resto a');
    });
    it('should show the name of the resto found by Favorite Resto', (done) => {
      document
        .querySelector('.resto-container')
        .addEventListener('resto:updated', () => {
          const restoName = document.querySelectorAll('.resto-name');
          expect(restoName.item(0).textContent).toEqual('resto abc');
          expect(restoName.item(1).textContent).toEqual('ada juga resto abcde');
          expect(restoName.item(2).textContent).toEqual(
            'ini juga boleh resto a'
          );
          done();
        });
      favoriteResto.search.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, name: 'resto abc' },
            { id: 222, name: 'ada juga resto abcde' },
            { id: 333, name: 'ini juga boleh resto a' },
          ];
        }
        return [];
      });
      search('resto a');
    });
    it('should show - when the resto returned does not contain a title', (done) => {
      document
        .querySelector('.resto-container')
        .addEventListener('resto:updated', () => {
          const restoName = document.querySelectorAll('.resto-name');
          expect(restoName.item(0).textContent).toEqual('-');

          done();
        });

      favoriteResto.search.mockImplementation((query) => {
        if (query === 'resto a') {
          return [{ id: 444 }];
        }

        return [];
      });

      search('resto a');
    });
  });
  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteResto.getAll.mockImplementation(() => []);

      search(' ');
      expect(presenter.latestQuery.length).toEqual(0);
      search('    ');
      expect(presenter.latestQuery.length).toEqual(0);
      search('');
      expect(presenter.latestQuery.length).toEqual(0);
      search('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
    it('should show all favorite resto', () => {
      favoriteResto.getAll.mockImplementation(() => []);

      search('    ');
      expect(favoriteResto.getAll).toHaveBeenCalled();
    });
  });
  describe('When no favorite resto could be found', () => {
    it('should show the empty message', (done) => {
      document
        .querySelector('.resto-container')
        .addEventListener('resto:updated', () => {
          expect(
            document.querySelectorAll('.resto-item__not__found').length
          ).toEqual(1);
          done();
        });
      favoriteResto.search.mockImplementation((query) => []);
      search('resto a');
    });
    it('should not show any resto', (done) => {
      document
        .querySelector('.resto-container')
        .addEventListener('resto:updated', () => {
          expect(document.querySelectorAll('.resto-item').length).toEqual(0);
          done();
        });
      favoriteResto.search.mockImplementation((query) => []);
      search('resto a');
    });
  });
});
