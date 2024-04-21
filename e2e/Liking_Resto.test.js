const assert = require('assert');
Feature('Liking Resto');

Before(({ I }) => {
  I.amOnPage('/#/Favorite');
});
Scenario('showing empty liked resto', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
});

Scenario('liking one resto', async ({ I }) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
  I.amOnPage('/');

  I.seeElement('.resto-name');

  const firstResto = locate('.resto-name').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/Favorite');
  I.seeElement('.resto-item');

  const likedMovieTitle = await I.grabTextFrom('.resto-name');

  assert.strictEqual(firstRestoTitle, likedMovieTitle);
});

Scenario('unliking one resto', async ({ I }) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
  I.amOnPage('/');

  I.seeElement('.resto-name');

  const lastResto = locate('.resto-name').last();
  const lastRestoTitle = await I.grabTextFrom(lastResto);
  I.click(lastResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/Favorite');
  I.seeElement('.resto-item');

  const likedMovieTitle = await I.grabTextFrom('.resto-name');

  assert.strictEqual(lastRestoTitle, likedMovieTitle);

  //unlike resto
  I.click(locate('.resto-name').at(1));
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/Favorite');
  I.dontSeeElement('.resto-item');
});

Scenario('searching favorite resto', async ({ I }) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');

  I.seeElement('.resto-item .resto-name');

  const titles = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.resto-name').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    // eslint-disable-next-line no-await-in-loop
    titles.push(await I.grabTextFrom('.data-resto .name'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/Favorite');
  I.seeElement('#query');

  const visibleLikedResto = await I.grabNumberOfVisibleElements('.resto-item');
  assert.strictEqual(titles.length, visibleLikedResto);

  const searchQuery = titles[1].substring(1, 3);
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');
  // mendapatkan daftar resto yang sesuai dengan searchQuery
  const matchingResto = titles.filter(
    (title) => title.indexOf(searchQuery) !== -1
  );
  const visibleSearchedLikedResto = await I.grabNumberOfVisibleElements(
    '.resto-item'
  );
  assert.strictEqual(matchingResto.length, visibleSearchedLikedResto);
  for (let i = 0; i < matchingResto.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const visibleRestoName = await I.grabTextFrom(
      locate('.resto-name').at(i + 1)
    );
    assert.strictEqual(matchingResto[i], visibleRestoName);
  }
});
