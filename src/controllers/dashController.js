export default class dashController{

  handle(promise) {
    return promise
      .then(data => data)
      .catch(error => Promise.reject(error));
  }

  
}



