import Cookies from 'js-cookie';

// Cookie configuration
const COOKIE_EXPIRES = 1/48; // 30 minutes in days

// Set user details in cookies
export const setUserCookies = (userData) => {
    Cookies.set('userId', userData.id, { expires: COOKIE_EXPIRES });
    Cookies.set('userUUID', userData.userID, { expires: COOKIE_EXPIRES });
    Cookies.set('firstName', userData.firstname, { expires: COOKIE_EXPIRES });
    Cookies.set('lastName', userData.lastname, { expires: COOKIE_EXPIRES });
    Cookies.set('email', userData.emailId, { expires: COOKIE_EXPIRES });
};

// Get user details from cookies
export const getUserFromCookies = () => {
    return {
        id: Cookies.get('userId'),
        userID: Cookies.get('userUUID'),
        firstname: Cookies.get('firstName'),
        lastname: Cookies.get('lastName'),
        emailId: Cookies.get('email')
    };
};

// Check if user is authenticated
export const isAuthenticated = () => {
    const user = getUserFromCookies();
    return Boolean(user.id && user.userID && user.firstname && user.lastname && user.emailId);
};

// Remove all cookies
export const removeCookies = () => {
    Cookies.remove('userId');
    Cookies.remove('userUUID');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('email');
};
