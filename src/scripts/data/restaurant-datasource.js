import API_ENDPOINT from '../globals/api-endpoint';

const isLoadingPage = (param) => {
  document.querySelector('#cover-spin').style.display = param
    ? 'block'
    : 'none';
};

const showResponseMessage = (message = 'Check your internet connection') => {
  let result = '';
  result = message === '{}' ? 'Check your internet connection' : message;
  alert(result);
};

class restaurantDataSource {
  static async getAll() {
    let result = [];
    isLoadingPage(true);
    try {
      const response = await fetch(API_ENDPOINT.LISTING);
      const responseJson = await response.json();
      result = responseJson.restaurants;
    } catch (error) {
      showResponseMessage(JSON.stringify(error));
    }
    isLoadingPage(false);
    return result;
  }

  static async get(id) {
    let result;
    isLoadingPage(true);
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      result = responseJson.restaurant;
    } catch (error) {
      showResponseMessage(JSON.stringify(error));
    }
    isLoadingPage(false);
    return result;
  }

  static async getBy(keyword) {
    let result;
    isLoadingPage(true);
    try {
      const response = await fetch(API_ENDPOINT.SEARCH(keyword));
      const responseJson = await response.json();
      result = responseJson.restaurants;
    } catch (error) {
      showResponseMessage(JSON.stringify(error));
    }
    isLoadingPage(false);
    return result;
  }

  static async review(data) {
    let responseJson;
    isLoadingPage(true);
    try {
      const response = await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json;',
        },
      });
      responseJson = await response.json();
    } catch (error) {
      showResponseMessage(JSON.stringify(error));
    }
    isLoadingPage(false);
    return responseJson;
  }
}

export default restaurantDataSource;
