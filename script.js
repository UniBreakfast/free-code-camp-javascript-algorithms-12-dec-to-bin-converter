const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");
const animationData = [
  /*   {
      inputVal: 5,
      addElDelay: 1000,
      msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
      showMsgDelay: 15000,
      removeElDelay: 20000,
    },
    {
      inputVal: 2,
      addElDelay: 1500,
      msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
      showMsgDelay: 10000,
      removeElDelay: 15000,
    },
    {
      inputVal: 1,
      addElDelay: 2000,
      msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.",
      showMsgDelay: 5000,
      removeElDelay: 10000,
    } */
];

const decimalToBinary = (input, stackIndex = 0) => {
  const interval = !stackIndex ? (input < 16 ? 500 : 250) : animationData[0].addElDelay / 2;
  const animationFrame = {
    inputVal: input,
    addElDelay: interval * (stackIndex + 2),
    msg: '',
    showMsgDelay: 0,
    removeElDelay: 0
  };

  animationData.push(animationFrame);

  if (input === 0 || input === 1) {
    const delay = stackIndex < 4 ? 5000 : 1500;

    animationFrame.msg = `decimalToBinary(${input}) returns "${input}" (base case) and gives that value to the stack below. Then it pops off the stack.`
    animationFrame.showMsgDelay = animationFrame.addElDelay + delay / 2;
    animationFrame.removeElDelay = animationFrame.showMsgDelay + delay;

    return String(input);
  } else {
    const nextResult = decimalToBinary(Math.floor(input / 2), stackIndex + 1);
    const remainder = input % 2;
    const nextAnimationFrame = animationData[stackIndex + 1];
    const delay = nextAnimationFrame.removeElDelay - nextAnimationFrame.showMsgDelay;

    animationFrame.msg = `decimalToBinary(${input}) returns "${nextResult}" + ${remainder} (${input} % 2). Then it pops off the stack.`
    animationFrame.showMsgDelay = nextAnimationFrame.removeElDelay;
    animationFrame.removeElDelay = animationFrame.showMsgDelay + delay;

    return nextResult + remainder;
  }
};

const showAnimation = (input) => {
  const binary = decimalToBinary(input);

  result.innerText = "Call Stack Animation";
  convertBtn.disabled = true;
  convertBtn.style.cursor = "not-allowed";

  animationData.forEach((obj) => {
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  setTimeout(() => {
    result.textContent = binary;
    animationData.splice(0, animationData.length);
    numberInput.placeholder = numberInput.value;
    numberInput.value = "";
    convertBtn.disabled = false;
    convertBtn.style.cursor = null;
  }, animationData[0].removeElDelay);
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }

  // I implemented calculations for any numbers and 
  // shortcircuited the function to always show the animation
  if (true || inputInt === 5) {
    showAnimation(inputInt);
    return;
  }

  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
