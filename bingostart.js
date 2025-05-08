let loadFile = function(event) {
let output = document.getElementById('output');
output.src = URL.createObjectURL(event.target.files[0]);
output.onload = function() {
    let inleveren = document.getElementById('inleveren')
    inleveren.hidden = false;
    URL.revokeObjectURL(output.src) // free memory
}
};
