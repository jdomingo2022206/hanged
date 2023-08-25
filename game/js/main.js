const wordToGuess = "HANGMAN";  // Palabra a adivinar (mayúsculas)
let guessedWord = "";
let incorrectGuesses = 0;
let maxIncorrectGuesses = 7;
let incorrectLetter = "";

const map = {};

function createAlphabetButtons(alphabet, containerName) {
    // const alphabet = 'ABCDEFGHIJKLMN';
    // const buttonsContainer = document.getElementById('alphabet-buttons');
    const buttonsContainer = document.getElementById(containerName);

    for (let letter of alphabet.split("")) {
        const button = document.createElement('button');
        button.textContent = letter;
        button.setAttribute('data-letra', letter);
        button.addEventListener('click', function (event) {
            const clickedLetter = event.target.textContent; // Valor de la letra en el botón
            // Llama a tu función de manejo de adivinanzas con la letra
            handleGuess(clickedLetter);
            console.log(clickedLetter);
        });

        buttonsContainer.appendChild(button);
    }
}

// Llama a la función para crear los botones del alfabeto
createAlphabetButtons("ABCDEFGHIJKLMN", "alphabet-buttons");
createAlphabetButtons("OPQRSTUVWXYZ", "alphabet-buttons2");














const mapToGuessedWord = () => {
    return wordToGuess.split("").reduce((acc, curr, i) => {
        return map[i] ? acc + curr : acc + "_"
    }, "")
}

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
    incorrectGuesses >= maxIncorrectGuesses && alert("¡Has perdido!");
    if (guessedWord === wordToGuess) alert("¡Has ganado!")
}

const checkIfNeedsPista = (letter) => {
    if (wordToGuess.includes(letter)) return;
    incorrectGuesses++;
    // Actualizar gráficos del ahorcado
    document.getElementById('pista').textContent = incorrectLetter += letter;

}

function handleGuess(letter) {
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


