document.getElementById('westernBtn').addEventListener('click', function() {
    document.getElementById('directionOptions').classList.toggle('hidden');
});

document.getElementById('towardChurchgateBtn').addEventListener('click', function() {
    window.location.href = 'churchgate.html'; // Link to Churchgate page
});

document.getElementById('towardVirarBtn').addEventListener('click', function() {
    window.location.href = 'vir-dah.html'; // Link to Virar/Dahanu page
});