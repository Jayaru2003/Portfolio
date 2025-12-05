// API Configuration for production/development
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8080/api'
    : 'https://portfolio-production.up.railway.app/api'; // Update this with your Railway URL after deployment

export default API_BASE_URL;
