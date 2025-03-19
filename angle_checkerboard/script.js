let currentCheckerSize = 40;	// Pixels
let angle1 = 45;	// Degrees
let angle2 = 135;	// Degrees
let htmlColor = '#ffffff';		// Hex string
let bodyColor = '#dedede';		// Hex string	
let blendMode = 'Color-Dodge';
let anglesDiff = angle2 - angle1;
let isAnglesLocked = 1;

const html = document.querySelector('html');
const body = document.querySelector('body');
const cssCode = document.querySelector('#css_code');
const copyButton = document.querySelector('.copy_block span');
const blendingModeSelect = document.querySelector('#blending_mode_select');
blendingModeSelect.value = blendMode;

function composeBgImage() {	
	return `repeating-linear-gradient(${angle1}deg, transparent, transparent ${currentCheckerSize}px, ${bodyColor} ${currentCheckerSize}px, ${bodyColor} ${currentCheckerSize * 2}px), repeating-linear-gradient(${angle2}deg, transparent, transparent ${currentCheckerSize}px, ${bodyColor} ${currentCheckerSize}px, ${bodyColor} ${currentCheckerSize * 2}px)`
	;	
}

function setCheckerboardBackground() {
	html.style.backgroundColor = htmlColor;
	body.style.backgroundImage = composeBgImage();	
	body.style.backgroundBlendMode = blendMode.toLowerCase();
	let currentCssCode = `
html {
    background-color: ${htmlColor};
}
body {
    background-image: ${composeBgImage()};
    background-blend-mode: ${blendMode.toLowerCase()};
}
	`;
	cssCode.textContent = currentCssCode;
	copyButton.textContent = 'Copy';
}

setCheckerboardBackground();

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

// Angles

const anglesPadlock = document.querySelector('#angles_padlock');
anglesPadlock.addEventListener('click', event => {
	if (isAnglesLocked == 1) {
		anglesPadlock.textContent = '🔓';
		isAnglesLocked = 0;
	} else {
		anglesPadlock.textContent = '🔒';
		isAnglesLocked = 1;
		anglesDiff = angle2 - angle1;
	}
});

const angle1Input = document.querySelector('#angle1');
const angle1Range = document.querySelector('#angle1_range');
angle1Input.value = angle1Range.value = angle1;
[angle1Input, angle1Range].forEach(el => {
	el.addEventListener('input', event => {
		angle1 = Number(event.target.value);
		angle1Input.value = angle1Range.value = angle1;
		if (isAnglesLocked) {
			angle2 = angle1 + anglesDiff;
			angle2Input.value = angle2;
			angle2Range.value = angle2;
		}
		setCheckerboardBackground();
	});
});

const angle2Input = document.querySelector('#angle2');
const angle2Range = document.querySelector('#angle2_range');
angle2Input.value = angle2Range.value = angle2;
[angle2Input, angle2Range].forEach(el => {
	el.addEventListener('input', event => {
		angle2 = Number(event.target.value);
		angle2Input.value = angle2Range.value = angle2;
		if (isAnglesLocked) {
			angle1 = angle2 - anglesDiff;
			angle1Input.value = angle1;
			angle1Range.value = angle1;
		}
		setCheckerboardBackground();
	});
});

// Html Color 

const htmlColorInput = document.querySelector('#html_color');
htmlColorInput.value = htmlColor;
htmlColorInput.addEventListener('input', event => {
	htmlColor = event.target.value;
	setCheckerboardBackground();
});

// Body Color 

const bodyColorInput = document.querySelector('#body_color');
bodyColorInput.value = bodyColor;
bodyColorInput.addEventListener('input', event => {
	bodyColor = event.target.value;
	setCheckerboardBackground();
});

// Blend Mode select

blendingModeSelect.addEventListener('change', event => {
	blendMode = event.target.value;
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