"use strict";
const password = document.getElementById('password');
const passwordSize = document.getElementById('pass-size');
const passwordStrDisplay = document.getElementById('pass-str');
const clickToCopy = document.getElementById('click-copy');
const modal = document.getElementById('modal');
const passwordRange = document.getElementById('pass-range');
const passwordLowerCheck = document.getElementById('lower-check');
const passwordUpperCheck = document.getElementById('upper-check');
const passwordNumberCheck = document.getElementById('number-check');
const passwordSpecialCheck = document.getElementById('symbol-check');
const generateBtn = document.getElementById('generate-btn');
const display = document.getElementsByClassName('display');
const charLower = 'abcdefghijklmnopqrstuvwxyz';
const charUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charNumbers = '0123456789';
const charSpecial = "~!@#$%^&()_+-={}[];',.";
passwordLowerCheck.checked = false;
passwordUpperCheck.checked = false;
passwordNumberCheck.checked = false;
passwordSpecialCheck.checked = false;
let passwordStr = 0;
let passRange = +passwordRange.value;
passwordStrDisplay.innerText = passwordStr;
passwordSize.innerText = passwordRange.value;
function handleDisplay() {
    for (let i = 0; i < 4; i += 1) {
        display[i].classList.remove('bg-redPass', 'border-redPass', 'bg-yellowPass', 'border-yellowPass', 'bg-greenPass', 'border-greenPass');
    }
    for (let i = 0; i < passwordStr; i += 1) {
        if (passwordStr === 1) {
            display[i].classList.add('bg-redPass', 'border-redPass');
        }
        else if (passwordStr < 4) {
            display[i].classList.add('bg-yellowPass', 'border-yellowPass');
        }
        else {
            display[i].classList.add('bg-greenPass', 'border-greenPass');
        }
    }
}
function handleChange() {
    passRange = +passwordRange.value;
    passwordSize.innerText = passwordRange.value;
}
function handleCheck(e) {
    if (e.target.checked) {
        passwordStr += 1;
    }
    else {
        passwordStr -= 1;
    }
    passwordStrDisplay.innerText = passwordStr;
    handleDisplay();
}
function generatePass(str) {
    if (!str)
        return 'baloney1stupidnumber'.slice(0, +passwordRange.value);
    let generatedPass = '';
    for (let i = 0; i < passRange; i += 1) {
        generatedPass += str[Math.floor(Math.random() * str.length)];
    }
    return generatedPass;
}
function handleClick() {
    let finalPasswordString = '';
    if (passwordLowerCheck.checked) {
        finalPasswordString += charLower;
    }
    if (passwordUpperCheck.checked) {
        finalPasswordString += charUpper;
    }
    if (passwordNumberCheck.checked) {
        finalPasswordString += charNumbers;
    }
    if (passwordSpecialCheck.checked) {
        finalPasswordString += charSpecial;
    }
    showModal('Feito!');
    password.innerText = generatePass(finalPasswordString);
}
function showModal(str) {
    if (str === 'Nada para copiar') {
        modal.classList.add('text-redPass');
    }
    modal.innerText = str;
    modal.classList.toggle('hidden');
    setTimeout(() => {
        modal.classList.toggle('hidden');
        modal.classList.remove('text-redPass');
    }, 3000);
}
function handleCopy() {
    if (!password.innerText)
        return showModal('Nada para copiar');
    let copyText = password.innerText;
    navigator.clipboard.writeText(copyText).then(() => {
        showModal('Copiado!');
    });
}
passwordLowerCheck.addEventListener('change', handleCheck);
passwordUpperCheck.addEventListener('change', handleCheck);
passwordNumberCheck.addEventListener('change', handleCheck);
passwordSpecialCheck.addEventListener('change', handleCheck);
passwordRange.addEventListener('change', handleChange);
generateBtn.addEventListener('click', handleClick);
clickToCopy.addEventListener('click', handleCopy);
