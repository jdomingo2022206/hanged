document.getElementById('playButton').addEventListener('click', function() {
    const dialog = document.getElementById('dialog');
    const verificarButton = document.getElementById('verificarButton');
    const result = document.querySelector('.result');
    const palabraEncontrada = document.getElementById('palabraEncontrada');
    const resultImage = document.getElementById('resultImage');
  
    dialog.style.display = 'block';
  
    verificarButton.addEventListener('click', function() {
      const inputPalabra = document.getElementById('inputPalabra').value.toLowerCase();
      
      if (inputPalabra === 'gano') {
        resultImage.src = 'img/GANADOR.png'; // Reemplaza con la ruta de la imagen para "Gano"
        result.querySelector('p').textContent = 'Gano';
      } else if (inputPalabra === 'perdio') {
        resultImage.src = 'img/PERDEDOR.png'; // Reemplaza con la ruta de la imagen para "Perdio"
        result.querySelector('p').textContent = 'Perdio';
      } else {
        alert('Por favor, ingresa "Gano" o "Perdio"');
        return;
      }
  
      palabraEncontrada.textContent = inputPalabra;
      dialog.style.display = 'none';
      result.style.display = 'block';
    });
  });
  