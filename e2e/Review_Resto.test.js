Feature('Review This Restaurant');

Scenario('Submit a new review', ({ I }) => {
  I.amOnPage('/');

  I.seeElement('.resto-name');

  const firstResto = locate('.resto-name').first();
  I.click(firstResto);

  const userName = 'Muhamad Windy Sulistiyo';
  const message = 'Great Place!';

  I.fillField('input[name="name"]', userName);
  I.fillField('textarea[name="review"]', message);
  I.click('Send');
  I.waitForText(userName, 5);
  I.waitForText(message, 5);
});
