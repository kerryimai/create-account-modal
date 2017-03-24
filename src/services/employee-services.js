import api from './api';

export default {
  fetchEmployees: () => api.get('employees'),
};
