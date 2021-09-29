import http from '../http-common';

class ArticleDataService {
  getAll() {
    return http.get('/');
  }

  get(id) {
    return http.get(`/findOne/${id}`);
  }

  create(data) {
    return http.post('/add', data);
  }

  update(id, data) {
    return http.put(`/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/delete/${id}`);
  }

  deleteAll() {
    return http.delete(`/`);
  }

  findByTitle(title) {
    return http.get(`/article?title=${title}`);
  }
}

export default new ArticleDataService();