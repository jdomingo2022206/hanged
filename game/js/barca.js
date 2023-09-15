const wordBank = ["MESSI", "XAVI", "INIESTA", "CRUYFF", "RONALDINHO", "PUYOL", "RIVALDO", "ROMARIO", "SUAREZ", "GUARDIOLA", "NEYMAR", "PIQUE"];

// Función para seleccionar una palabra aleatoria del banco
function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomIndex];
}

let wordToGuess = selectRandomWord(); // Inicializar con una palabra aleatoria del banco

let guessedWord = "";
let incorrectGuesses = 0;
let maxIncorrectGuesses = 6;
let incorrectLetter = "";
let vidas = 7;

const usedLetters = new Set(); // Conjunto para rastrear las letras utilizadas

const map = {};


const mapToGuessedWord = () => {
    return wordToGuess.split("").reduce((acc, curr, i) => {
        return map[i] ? acc + curr : acc + " _"
    }, "")
}

function inicio() {
    guessedWord = mapToGuessedWord()
    document.getElementById('word-container').textContent = guessedWord;

}

inicio();

function createAlphabetButtons(alphabet, containerName) {
    const buttonsContainer = document.getElementById(containerName);

    for (let letter of alphabet.split("")) {
        const button = document.createElement('button');
        button.textContent = letter;
        button.setAttribute('data-letra', letter);
        button.addEventListener('click', function (event) {
            const clickedLetter = event.target.textContent; // Valor de la letra en el botón
            // Llama a tu función de manejo de adivinanzas con la letra
            handleGuess(clickedLetter);

        });

        buttonsContainer.appendChild(button);
    }
}

// Llama a la función para crear los botones del alfabeto
createAlphabetButtons("QWERTYUIOP", "alphabet-buttons");
createAlphabetButtons("ASDFGHJKL", "alphabet-buttons2");
createAlphabetButtons("ZXCVBNM", "alphabet-buttons3");

const checkLetter = (letter) => {
    wordToGuess.split("").forEach((letterOfWord, i) => {
        if (letterOfWord === letter) map[i] = true;
    });
}

const disableButton = (letter) => {

    const button = document.querySelector(`button[data-letra="${letter}"]`);
    button.disabled = true;
}

function redirectToWinPage() {
    window.location.href = "Ganaste.html"; // Reemplaza "ganaste.html" con la ruta de tu página de victoria
}

function redirectToLosePage() {
    window.location.href = "Perdiste.html"; // Reemplaza "perdiste.html" con la ruta de tu página de derrota
}


const checkWinner = () => {
    if (incorrectGuesses >= maxIncorrectGuesses) {
        document.getElementById('word-container').textContent = wordToGuess;
        document.getElementById('status-game').textContent = "Has perdido";
        redirectToLosePage(); // Redirigir a la página de derrota
    } else if (guessedWord === wordToGuess) {
        document.getElementById('status-game').textContent = "Has ganado";
        redirectToWinPage(); // Redirigir a la página de victoria
    }
}


    // incorrectGuesses >= maxIncorrectGuesses && alert("¡Has perdido!");
    // // if (incorrectGuesses >= maxIncorrectGuesses) alert("¡Has perdido!");
    // if (guessedWord === wordToGuess) alert("¡Has ganado!")


const checkIfNeedsPista = (letter) => {
    if (wordToGuess.includes(letter)) return;
    incorrectGuesses++;
    vidas--;
    // Actualizar gráficos del ahorcado
    drawHangman(ctx);
    document.getElementById('pista').textContent = incorrectLetter += letter;
    document.getElementById('vidas').textContent = vidas;

}

function handleGuess(letter) {
    // Verificar si se completó la palabra o se perdio el juego
    checkWinner()

    checkLetter(letter)

    guessedWord = mapToGuessedWord()

    disableButton(letter)
    if (!wordToGuess.includes(letter)) {
        checkIfNeedsPista(letter)
        return
    }
    if (!guessedWord.includes(letter)) guessedWord += letter;

    document.getElementById('word-container').textContent = guessedWord;

    // Verificar si se completó la palabra o se perdio el juego
    checkWinner()
}


document.addEventListener('keydown', function(event) {
    // Verificar si la tecla presionada es una letra
    if (/^[a-zA-Z]$/.test(event.key)) {
        // Convertir la letra a mayúscula
        const letter = event.key.toUpperCase();
        
        // Verificar si la letra ya fue utilizada
        if (!usedLetters.has(letter)) {
            // Agregar la letra al conjunto de letras utilizadas
            usedLetters.add(letter);
            // Llamar a la función de manejo de adivinanzas con la letra
            handleGuess(letter);
        }
    }
});

const canvas = document.getElementById('hangman-canvas');
const ctx = canvas.getContext('2d');
// Obtén el elemento canvas y su contexto

function drawHangman(ctx) {
    // Limpia el canvas antes de redibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
     // Dibuja el poste vertical
     ctx.moveTo(20, 400);
     ctx.lineTo(20, 20);
 
     // Dibuja el travesaño superior
     ctx.moveTo(20, 20);
     ctx.lineTo(250, 20);

     // Establece el estilo del trazo
     ctx.strokeStyle = 'black';
     ctx.lineWidth = 8;
 
    ctx.stroke();

    // Dibuja  la cuerda
    if (vidas < 7) {
        ctx.beginPath();
        ctx.moveTo(250, 20);
        ctx.lineTo(250, 50);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.stroke();

        // Dibuja la cabeza 
        if (vidas < 6) {
            ctx.beginPath();
            ctx.arc(250, 100, 50, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 8;
            ctx.stroke();
            // Dibuja el brazo izquierdo
            if (vidas < 5) {
                ctx.beginPath();
                ctx.moveTo(250, 300);
                ctx.lineTo(250, 150);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 8;
                ctx.stroke();

                // Dibuja el brazo derecho
                if (vidas < 4) {
                    ctx.beginPath();
                    ctx.moveTo(250, 200);
                    ctx.lineTo(180, 150);
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 8;
                    ctx.stroke();
                    // Dibuja el brazo derecho si hay menos de 3 vidas
                    if (vidas < 3) {
                        ctx.beginPath();
                        ctx.moveTo(250, 200);
                        ctx.lineTo(325, 150);
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 8;
                        ctx.stroke();
                        // Dibuja la pierna izquierda si hay menos de 2 vidas
                        if (vidas < 2) {
                            ctx.beginPath();
                            ctx.moveTo(250, 300);
                            ctx.lineTo(350, 375);
                            ctx.strokeStyle = 'black';
                            ctx.lineWidth = 8;
                            ctx.stroke();

                            // Dibuja la pierna derecha si hay menos de 1 vida
                            if (vidas < 1) {
                                ctx.beginPath();
                                ctx.moveTo(170, 375);
                                ctx.lineTo(250, 300);
                                ctx.strokeStyle = 'black';
                                ctx.lineWidth = 8;
                                ctx.stroke();
                            }
                        }
                    }
                }
            }
        }
    }
}


// Función para dibujar la estaca del ahorcado
function Hangman() {
    // Comienza un nuevo trazo
    ctx.beginPath();

    // Dibuja el poste vertical
    ctx.moveTo(20, 400);
    ctx.lineTo(20, 20);

    // Dibuja el travesaño superior
    ctx.moveTo(20, 20);
    ctx.lineTo(250, 20);

    // Dibuja los trazos
    ctx.stroke();

    // Establece el estilo del trazo
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 8;

    // Dibuja los trazos
    ctx.stroke();
}

// Llama a la función para dibujar la estaca
Hangman();