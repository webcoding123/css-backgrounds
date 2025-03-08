let currentCheckerSize = 80;	// Pixels
let currentFirstColor = '#dedede';		// Hex string
let currentSecondColor = '#ffffff';		// Hex string	

const body = document.querySelector('body');
const cssCode = document.querySelector('#css_code');
const copyButton = document.querySelector('.copy_block span');

function getCurrentBgImage() {
	return `conic-gradient(
        ${currentSecondColor} 0.25turn,
        ${currentFirstColor} 0.25turn 0.5turn,
        ${currentSecondColor} 0.5turn 0.75turn,
        ${currentFirstColor} 0.75turn
    )`	
	;
	
}

function getCurrentBgSize() {
	return `${currentCheckerSize}px ${currentCheckerSize}px`;
}

function setCheckerboardBackground() {
	swatch.style.backgroundImage = getCurrentBgImage();
	swatch.style.backgroundSize = getCurrentBgSize();
	if (wholePageCheckbox.checked) {
		body.style.backgroundImage = getCurrentBgImage();
		body.style.backgroundSize = getCurrentBgSize();		
	} else {
		body.style.backgroundImage = 'none';
		body.style.backgroundSize = 0;
	}
	let currentCssCode = `
${wholePageCheckbox.checked ? 'body, ' : ''}div {
    background-image: ${getCurrentBgImage()};
    background-size: ${getCurrentBgSize()};
}
	`;
	cssCode.textContent = currentCssCode;
	copyButton.textContent = 'Copy';
}

// Swatch

const swatch = document.querySelector('.swatch');
const wholePageCheckbox = document.querySelector('#whole_page');
setCheckerboardBackground();
wholePageCheckbox.addEventListener('change', event => {
	setCheckerboardBackground();
});

// Checker Size

const checkerSizeInput = document.querySelector('#checker_size');
checkerSizeInput.value = currentCheckerSize;
const checkerRangeInput = document.querySelector('#checker_range');
checkerRangeInput.value = currentCheckerSize;
checkerSizeInput.addEventListener('input', event => {
	currentCheckerSize = Number(event.target.value);
	checkerRangeInput.value = currentCheckerSize;
	setCheckerboardBackground();
});
checkerRangeInput.addEventListener('input', event => {
	currentCheckerSize = Number(event.target.value);
	checkerSizeInput.value = currentCheckerSize;	
	setCheckerboardBackground();
});

// First Color 

const firstColorInput = document.querySelector('#first_color');
firstColorInput.value = currentFirstColor;
firstColorInput.addEventListener('input', event => {
	currentFirstColor = event.target.value;
	setCheckerboardBackground();
});

// Second Color 

const secondColorInput = document.querySelector('#second_color');
secondColorInput.value = currentSecondColor;
secondColorInput.addEventListener('input', event => {
	currentSecondColor = event.target.value;
	setCheckerboardBackground();
});

// CSS code copy

copyButton.addEventListener('click', event => writeToClipboard(cssCode.textContent.trim()));

async function writeToClipboard(text) {
	try {
		await navigator.clipboard.writeText(text);
		copyButton.textContent = 'Copied!';
	} catch (error) {
		console.error(error.message);
	}
}