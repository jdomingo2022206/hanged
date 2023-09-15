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

const checkWinner = () => {

    if (incorrectGuesses >= maxIncorrectGuesses) {
        // alert("¡Has perdido!");
        document.getElementById('word-container').textContent = wordToGuess;
        document.getElementById('status-game').textContent = "Has perdido";
    } else if (guessedWord === wordToGuess) {
        // alert("¡Has ganado!");
        document.getElementById('status-game').textContent = "Has ganado";
    }

    // incorrectGuesses >= maxIncorrectGuesses && alert("¡Has perdido!");
    // // if (incorrectGuesses >= maxIncorrectGuesses) alert("¡Has perdido!");
    // if (guessedWord === wordToGuess) alert("¡Has ganado!")
}

const checkIfNeedsPista = (letter) => {
    if (wordToGuess.includes(letter)) return;
    incorrectGuesses++;
    vidas--;
    // Actualizar gráficos del ahorcado
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

