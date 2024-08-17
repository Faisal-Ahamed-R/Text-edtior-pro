// Function to convert text to a single line with the first letter of each word capitalized and commas between non-empty lines
function convertToSingleLine() {
    const inputText = document.getElementById('inputText1').value;
    const sentences = inputText.split('\n').map(sentence => sentence.trim()).filter(sentence => sentence !== "");

    // Capitalize the first letter of each word in non-empty sentences
    const formattedSentences = sentences.map(sentence => 
        sentence.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    );

    // Join sentences with a comma and space
    const outputText = formattedSentences.join(', ');

    document.getElementById('outputText1').value = outputText;
    updateCharacterCount('outputText1');
}

// Function to convert text to N x 2 format
function convertToNby2() {
    const inputText = document.getElementById('inputText2').value;
    const lines = inputText.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

    const n = lines.length;
    const outputLines = [];

    for (let i = 0; i < n; i += 2) {
        outputLines.push(lines.slice(i, i + 2).join(' '));
    }

    const outputText = outputLines.join('\n');

    document.getElementById('outputText2').value = outputText;
    updateCharacterCount('outputText2');
}

// Function to format column text
function formatColumnText() {
    const inputText = document.getElementById('inputText3').value;
    const lines = inputText.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Example logic: Adjust based on your requirements
    const formattedText = lines.join('\n'); // Replace with actual formatting logic if needed

    document.getElementById('outputText3').value = formattedText;
    updateCharacterCount('outputText3');
}

// Function to copy text to clipboard
function copyText(textareaId) {
    const textarea = document.getElementById(textareaId);
    textarea.select();
    document.execCommand('copy');
}

// Function to update character count and repeated words
function updateCharacterCount(textareaId) {
    const textarea = document.getElementById(textareaId);
    const text = textarea.value;
    const charCount = text.length;
    document.getElementById(`characterCount${textareaId.slice(-1)}`).innerText = `Character Count: ${charCount}`;

    // Example repeated words logic: Adjust based on your requirements
    const words = text.split(/\s+/).filter(Boolean);
    const wordCounts = {};
    words.forEach(word => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
    const repeatedWords = Object.keys(wordCounts).filter(word => wordCounts[word] > 1).join(', ');
    document.getElementById(`repeatedWords${textareaId.slice(-1)}`).innerText = `Repeated Words: ${repeatedWords}`;
}
// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const sections = document.querySelectorAll('.section');
    const textareas = document.querySelectorAll('textarea');
    const buttons = document.querySelectorAll('button');
    const characterCounts = document.querySelectorAll('[id^="characterCount"]');
    const repeatedWords = document.querySelectorAll('[id^="repeatedWords"]');

    body.classList.toggle('dark-mode');
    sections.forEach(section => section.classList.toggle('dark-mode'));
    textareas.forEach(textarea => textarea.classList.toggle('dark-mode'));
    buttons.forEach(button => button.classList.toggle('dark-mode'));
    characterCounts.forEach(count => count.classList.toggle('dark-mode'));
    repeatedWords.forEach(word => word.classList.toggle('dark-mode'));
}

// Check localStorage for dark mode preference
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        toggleDarkMode(); // Apply dark mode if previously enabled
    }

    // Create a toggle button for dark mode and add it to the top
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Dark Mode';
    toggleButton.classList.add('dark-mode-toggle');
    toggleButton.onclick = () => {
        toggleDarkMode();
        // Save the current mode in localStorage
        const darkModeEnabled = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', darkModeEnabled);
    };

    // Append the toggle button to the header
    document.querySelector('header').appendChild(toggleButton);
});