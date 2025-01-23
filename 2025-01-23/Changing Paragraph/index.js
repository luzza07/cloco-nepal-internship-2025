// Accessing the button and paragraph elements
const button = document.getElementById('myButton');
const paragraph = document.getElementById('myParagraph');

button.addEventListener('click', function() {
    // Change the paragraph text
    paragraph.textContent = 'The paragraph text has changed! lorem ';

    // Add a new paragraph
    const newParagraph = document.createElement('p');
    newParagraph.textContent = 'This is a new dynamically added paragraph.';
    document.body.appendChild(newParagraph);

    // Toggle button background color
    button.classList.toggle('toggle-color');
});
