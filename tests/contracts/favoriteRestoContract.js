const itActsAsFavoriteRestoModel = (favoriteResto) => {
  it('should return the resto that has been added', async () => {
    favoriteResto.put({ id: 1 });
    favoriteResto.put({ id: 2 });

    expect(await favoriteResto.get(1)).toEqual({ id: 1 });
    expect(await favoriteResto.get(2)).toEqual({ id: 2 });
    expect(await favoriteResto.get(3)).toEqual(undefined);
  });

  it('should refuse a resto from being added if it does not have the correct property', async () => {
    favoriteResto.put({ aProperty: 'property' });

    expect(await favoriteResto.getAll()).toEqual([]);
  });

  it('can return all of the resto that have been added', async () => {
    favoriteResto.put({ id: 1 });
    favoriteResto.put({ id: 2 });

    expect(await favoriteResto.getAll()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove favorite movie', async () => {
    favoriteResto.put({ id: 1 });
    favoriteResto.put({ id: 2 });
    favoriteResto.put({ id: 3 });

    await favoriteResto.delete(1);

    expect(await favoriteResto.getAll()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should handle request to remove a resto even though the resto has not been added', async () => {
    favoriteResto.put({ id: 1 });
    favoriteResto.put({ id: 2 });
    favoriteResto.put({ id: 3 });

    await favoriteResto.delete(4);

    expect(await favoriteResto.getAll()).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);
  });

  it('should be able to search for resto', async () => {
    favoriteResto.put({ id: 1, name: 'resto a' });
    favoriteResto.put({ id: 2, name: 'resto b' });
    favoriteResto.put({ id: 3, name: 'resto abc' });
    favoriteResto.put({ id: 4, name: 'ini mah resto abcd' });

    expect(await favoriteResto.search('resto a')).toEqual([
      { id: 1, name: 'resto a' },
      { id: 3, name: 'resto abc' },
      { id: 4, name: 'ini mah resto abcd' },
    ]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteRestoModel };
