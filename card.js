// Load saved image from localStorage if exists
window.onload = function() {
    const savedImage = localStorage.getItem('uploadedImage');
    if (savedImage) {
      document.getElementById('output').src = savedImage;
    } else {
      // Optional: fallback image if nothing is saved yet
      document.getElementById('output').src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMuRviGmuOIjiaBd9elsOJ9lthIA9hKV6JGQ&s";
    }
  }

  // Handle image upload + save to localStorage
  function loadFile(event) {
    const output = document.getElementById('output');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      output.src = e.target.result;
      localStorage.setItem('uploadedImage', e.target.result);
    };

    reader.readAsDataURL(file);
  }