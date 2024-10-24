import Cookies from "js-cookie";


// export const getToken = () => localStorage.getItem('token');
// export const removeToken = () => localStorage.removeItem('token');
export const getToken = () => Cookies.get('authToken');
export const removeToken = () => Cookies.remove("authToken");;
