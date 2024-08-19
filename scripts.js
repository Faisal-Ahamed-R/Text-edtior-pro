// Convert to Single Line function
function convertToSingleLine() {
    // Get the input text
    let inputText = document.getElementById("inputText1").value;

    // Split the input into lines by newline characters
    let lines = inputText.split('\n');

    // Define a list of articles and prepositions that should not be capitalized
    const lowercaseWords = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'in', 'with', 'at', 'by', 'from', 'up', 'down', 'over', 'under', 'to', 'as', 'of'];

    // Define regular expression to match special characters and symbols
    const specialCharRegex = /[\u25A0-\u25FF\u2600-\u26FF\u2700-\u27BF\u2022]/g; // Bullet points, shapes, etc.

    // Clean each line by removing special symbols and trimming extra spaces
    let cleanedLines = lines.map(line => {
        // Remove special characters and symbols
        line = line.replace(specialCharRegex, '');

        // Trim the line
        line = line.trim();

        // Capitalize first letter of each word except for lowercaseWords
        let words = line.split(' ').map((word, index) => {
            // Capitalize the word unless it's in the lowercaseWords array and not the first word
            if (lowercaseWords.includes(word.toLowerCase()) && index !== 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        // Join the words back into a sentence
        return words.join(' ');
    });

    // Filter out any empty lines
    cleanedLines = cleanedLines.filter(line => line.length > 0);

    // Join the cleaned lines into a single string, separated by commas
    let result = cleanedLines.map(line => {
        // If line ends with a comma or colon, don't add an additional comma
        if (line.endsWith(',') || line.endsWith(':')) {
            return line;
        }
        return line + ',';
    }).join(' ');

    // Remove the last comma if the result ends with it
    if (result.endsWith(',')) {
        result = result.slice(0, -1);
    }

    // Find the position of the last comma and replace it with " &"
    const lastCommaIndex = result.lastIndexOf(',');
    if (lastCommaIndex !== -1) {
        result = result.substring(0, lastCommaIndex) + ' &' + result.substring(lastCommaIndex + 1);
    }

    // Set the output text
    document.getElementById("outputText1").value = result;

    // Update character count
    document.getElementById("characterCount1").innerText = "Character Count: " + result.length;
}

// Function to count characters in real-time in input box
function countCharactersInInput() {
    let inputText = document.getElementById("inputText1").value;
    document.getElementById("characterCount1").innerText = "Character Count: " + inputText.length;
}

// Attach event listener to count characters in real-time
document.getElementById("inputText1").addEventListener('input', countCharactersInInput);

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
// Function to display example data for each section
function showExample(section) {
    let exampleText = '';

    switch(section) {
        case 'single-line':
            exampleText = `Laptop Hinge Repair\n
Cracked LCD Screen Repair\n
Same Day Computer Repair\n
Battery Replacement\n
Apple Laptop Repair\n
Water Spill Repair\n
Custom Gaming PC Build & Repair\n
Virus Malware Scan and Removal\n
Data Transfer and Recovery\n
Not Turning On / Power Issue\n
Computer Recycling`;
            break;

        case 'n-by-2':
            exampleText = `Provincial Vehicle Inspection\n
$45.00\n
Vehicle Inspection\n
$35.00\n
Tire Rotation\n
$10.00\n
Wheel Balancing\n
From $13.50\n
4 Wheel Alignment\n
$89.95\n
Scanner\n
$70.00\n
Brake Inspection\n
$35.00\n
Front Disc Brakes\n
Ask About Price\n
Brake Fluid Flush\n
$60.00\n
Charging System Diagnosis\n
$35.95\n
Replacing Serpentine Belt\n
Ask About Price\n
Gas Service\n
$129.99`;
            break;

        case 'format-columns':
            exampleText = `Hardware Diagnostic $30\n
Screen Replace $80\n
Hard Drive Clone $60\n
Windows 10 or 11 $60\n
Power Supply $60\n
Power Jack $100\n
Data Recovery Starting at $80 to $200`;
            break;

        default:
            exampleText = 'No example available.';
    }

    const exampleTextArea = document.createElement('textarea');
    exampleTextArea.value = exampleText;
    exampleTextArea.setAttribute('readonly', true);
    exampleTextArea.style.width = '100%';
    exampleTextArea.style.height = '150px';
    exampleTextArea.style.margin = '10px 0';
    exampleTextArea.style.padding = '12px';
    exampleTextArea.style.fontSize = '16px';
    exampleTextArea.style.border = '1px solid #ccc';
    exampleTextArea.style.borderRadius = '8px';
    exampleTextArea.style.backgroundColor = '#fff';
    exampleTextArea.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.1)';
    exampleTextArea.style.overflow = 'auto';

    const sectionElement = document.querySelector(`.section.${section}`);
    sectionElement.appendChild(exampleTextArea);
}
// Function to show info in an alert
function showInfo(infoType) {
    let infoMessage = '';
    switch (infoType) {
        case 'singleLineInfo':
            infoMessage = "This function converts columns of words or sentences into single with commas.\n\nFor example:\nInput:\n" +
                          "laptop Hinge Repair\ncracked LCD screen Repair\nsame Day Computer Repair\n...\n\n" +
                          "Output:\nLaptop Hinge Repair, Cracked Lcd Screen Repair, Same Day Computer Repair, ...";
            break;
        case 'nBy2Info':
            infoMessage = "This function converts columns of words or sentences into N x 2 Format. This is helpful for editing prices.\n\nFor example:\n" +
                          "Input:\nProvincial Vehicle Inspection\n$45.00\n...\n\n" +
                          "Output:\nProvincial Vehicle Inspection $45.00\nVehicle Inspection $35.00\n...";
            break;
        case 'formatColumnTextInfo':
            infoMessage = "This function removes the extra line space in columns of words or sentences.\n\nFor example:\n" +
                          "Input:\nHardware Diagnostic $30\n\nScreen Replace $80\n...\n\n" +
                          "Output:\nHardware Diagnostic $30\nScreen Replace $80\n...";
            break;
        default:
            infoMessage = "No information available.";
    }
    alert(infoMessage);
}
