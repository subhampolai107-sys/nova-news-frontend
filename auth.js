// LOGIN HANDLING
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        alert("Login successful!");
        window.location.href = 'dashboard.html';
      } else {
        alert(data.error || "Login failed. Check your email/password.");
      }
    } catch (err) {
      alert("Server se connect nahi ho paya. Backend chalu hai kya check karo.");
      console.error(err);
    }
  });
}

// SIGNUP HANDLING
const signupForm = document.getElementById('signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully! Please login.");
        window.location.href = 'login.html';
      } else {
        alert(data.error || "Signup failed.");
      }
    } catch (err) {
      alert("Server se connect nahi ho paya. Backend chalu hai kya check karo.");
      console.error(err);
    }
  });
}