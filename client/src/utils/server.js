import axios from 'axios';

let user = JSON.parse(localStorage.getItem('user'));
console.log(user);
const instance = axios.create({
	baseURL: `https://lambda-study-app.herokuapp.com/api/`,
});

if (user) {
	instance.defaults.headers.common['Authorization'] = user.token;
}

export default instance;
