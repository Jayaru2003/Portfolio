// API Configuration for production/development
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8080/api'
    : 'https://portfolio-production-5562.up.railway.app/api';

export default API_BASE_URL;
