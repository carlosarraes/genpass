const password: HTMLElement = document.getElementById('password')!;
const passwordSize: HTMLElement = document.getElementById('pass-size')!;
const passwordStrDisplay: HTMLElement = document.getElementById('pass-str')!;
const clickToCopy: HTMLElement = document.getElementById('click-copy')!;
const modal: HTMLElement = document.getElementById('modal')!;
const passwordRange = document.getElementById('pass-range') as HTMLInputElement;
const passwordLowerCheck = document.getElementById('lower-check') as HTMLInputElement;
const passwordUpperCheck = document.getElementById('upper-check') as HTMLInputElement;
const passwordNumberCheck = document.getElementById('number-check') as HTMLInputElement;
const passwordSpecialCheck = document.getElementById('symbol-check') as HTMLInputElement;
const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
const display: HTMLCollection = document.getElementsByClassName('display');
const charLower: string = 'abcdefghijklmnopqrstuvwxyz';
const charUpper: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charNumbers: string = '0123456789';
const charSpecial: string = "~!@#$%^&()_+-={}[];',.";
passwordLowerCheck.checked = false;
passwordUpperCheck.checked = false;
passwordNumberCheck.checked = false;
passwordSpecialCheck.checked = false;
let passwordStr: any = 0;
let passRange: number = +passwordRange.value;
passwordStrDisplay.innerText = passwordStr;

passwordSize.innerText = passwordRange.value;

function handleDisplay() {
  for (let i: number = 0; i < 4; i += 1) {
    display[i].classList.remove(
      'bg-redPass',
      'border-redPass',
      'bg-yellowPass',
      'border-yellowPass',
      'bg-greenPass',
      'border-greenPass'
    );
  }
  for (let i: number = 0; i < passwordStr; i += 1) {
    if (passwordStr === 1) {
      display[i].classList.add('bg-redPass', 'border-redPass');
    } else if (passwordStr < 4) {
      display[i].classList.add('bg-yellowPass', 'border-yellowPass');
    } else {
      display[i].classList.add('bg-greenPass', 'border-greenPass');
    }
  }
}

function handleChange() {
  passRange = +passwordRange.value;
  passwordSize.innerText = passwordRange.value;
}

function handleCheck(e: any) {
  if (e.target.checked) {
    passwordStr += 1;
  } else {
    passwordStr -= 1;
  }
  passwordStrDisplay.innerText = passwordStr;
  handleDisplay();
}

function generatePass(str: string): string {
  if (!str) return 'baloney1stupidnumber'.slice(0, +passwordRange.value);
  let generatedPass: string = '';
  for (let i = 0; i < passRange; i += 1) {
    generatedPass += str[Math.floor(Math.random() * str.length)];
  }
  return generatedPass;
}

function handleClick() {
  let finalPasswordString: string = '';
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

function showModal(str: string): void {
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
  if (!password.innerText) return showModal('Nada para copiar');
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
