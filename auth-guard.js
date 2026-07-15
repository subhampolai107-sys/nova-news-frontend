// Yeh check karta hai ki user logged in hai ya nahi
const token = localStorage.getItem('token');

if (!token) {
  alert("Please login first!");
  window.location.href = 'login.html';
}