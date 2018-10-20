const user = localStorage.getItem('user');
const token = user && JSON.parse(user).token;

export default function({ redirect, route }) {
  // If the user is authenticated redirect to login'
  if (!token && route.path !== '/login') {
    return redirect('/login');
  }
  if (token && ( route.path === '/login' || route.path === '/login/')) {
    return redirect('/dashboard');
  }
}
