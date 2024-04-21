class FavoriteRestoSearchPresenter {
  constructor({ favoriteResto, view }) {
    this._favoriteResto = favoriteResto;
    this._view = view;
    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._search(latestQuery);
    });
  }

  async _search(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundResto;
    if (this.latestQuery.length > 0) {
      foundResto = await this._favoriteResto.search(this.latestQuery);
    } else {
      foundResto = await this._favoriteResto.getAll();
    }
    this._showFoundResto(foundResto);
  }

  _showFoundResto(resto) {
    this._view.showFavoriteResto(resto);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestoSearchPresenter;
