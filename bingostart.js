let page = 0;
let dataLength = 0;

function loadFile(event) {
    let output = document.getElementById('output');
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        output.src = e.target.result;

        // Store Base64 string in localStorage, keyed by page
        localStorage.setItem(`uploadedImage_page_${page}`, e.target.result);

        let inleveren = document.getElementById('inleveren');
        inleveren.hidden = false;
    };

    reader.readAsDataURL(file); // Read file as Base64
}

function callData() {
    fetch('./route.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            dataLength = data.length;

            // Ensure page stays within bounds
            if (page < 0) page = 0;
            if (page >= dataLength) page = dataLength - 1;

            let titel = document.getElementById('titel');
            let afbeelding = document.getElementById('afbeelding');
            let locatie = document.getElementById('locatie');
            let opdrachttitel = document.getElementById('opdrachttitel');
            let opdrachtbeschrijving = document.getElementById('opdrachtbeschrijving');
            let output = document.getElementById('output');
            let inleveren = document.getElementById('inleveren');

            titel.textContent = data[page].titel;
            afbeelding.src = data[page].afbeelding;
            locatie.textContent = data[page].locatie;
            opdrachttitel.textContent = data[page].opdrachttitel;
            opdrachtbeschrijving.textContent = data[page].opdrachtbeschrijving;

            // Load saved image for the current page, if it exists
            let savedImage = localStorage.getItem(`uploadedImage_page_${page}`);
            if (savedImage) {
                output.src = savedImage;
                inleveren.hidden = false;
            } else {
                output.src = ''; // Clear image if no saved image for this page
                inleveren.hidden = true; // Hide button
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Event listeners for next and previous buttons
document.getElementById('nextPage').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    if (page < dataLength - 1) {
        page++;
        callData();
    }
});

document.getElementById('previousPage').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    if (page > 0) {
        page--;
        callData();
    }
});

// Initial call to load the first page
callData();