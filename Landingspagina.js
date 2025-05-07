document.getElementById('switch-link').addEventListener('click', function(e) {
    e.preventDefault();
    let adminLogin = document.getElementById('admin-login');
    let studentLogin = document.getElementById('student-login');
    let switchLink = document.getElementById('switch-link');
    
    if (adminLogin.style.display === 'none') {
      adminLogin.style.display = 'block';
      studentLogin.style.display = 'none';
      switchLink.textContent = 'Speel als student';
    } else {
      adminLogin.style.display = 'none';
      studentLogin.style.display = 'block';
      switchLink.textContent = 'Login als admin';
    }
  });