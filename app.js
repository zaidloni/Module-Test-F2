const img1El = document.getElementById("img1");
const img2El = document.getElementById("img2");
const img3El = document.getElementById("img3");
const img4El = document.getElementById("img4");
const userDetailsEl = document.querySelector(".user-details");
const formContainerEl = document.querySelector(".form-container");
let diceEl = document.querySelector("#dice");
let name;
let username;
let email;

// Image 1 handler
img1El.addEventListener(
  "click",
  () => {
    console.log("from 1");
    formContainerEl.classList.remove("hide");
    name = formContainerEl.querySelector("#name").value;
    username = formContainerEl.querySelector("#username").value;
    email = formContainerEl.querySelector("#email").value;
    hanldeImg2();
  },
  { once: true }
);

// Image 2 handler
function hanldeImg2() {
  img2El.addEventListener("click", function a() {
    console.log("from 2");
    name = formContainerEl.querySelector("#name").value;
    username = formContainerEl.querySelector("#username").value;
    email = formContainerEl.querySelector("#email").value;
    if (name === "" || username === "" || email === "") {
      alert("please fill the form details");
    } else {
      formContainerEl.classList.add("hide");
      userDetailsEl.innerHTML += `
      <h1> Username: ${username} </h1>
        <h1>name: ${name} </h1>`;
      formContainerEl.querySelector("#name").value = "";
      formContainerEl.querySelector("#username").value = "";
      formContainerEl.querySelector("#email").value = "";
      handelImg3();
      img2El.removeEventListener("click", a);
    }
  });
}

// Varaibles for dice
let sum = 0;
let count = 0;
let times = 0;

//Dice handler
diceEl.addEventListener("click", handleClick);
function handleClick() {
  console.log("from dice");
  if (count < 3) {
    sum += getRandom();
    document.querySelector(".p").innerHTML = `
    The sum is ${sum}`;
    count++;
  } else if (count === 3 && sum <= 10 && times != 1) {
    count = 0;
    sum = 0;
    times++;
    diceEl.classList.toggle("hide");
    alert("sum is below 10 please try again by clicking image 3");
  } else {
    if (sum < 10) {
      alert("Bad luck u cannot click 4th image");
    }
    if (sum > 10) {
      document.querySelector(".p").innerHTML = `
    The sum is ${sum} u can click img 4`;
      // Image 4 handler
      img4El.addEventListener("click", () => {
        console.log("from 4");
        let random = crypto.randomUUID();
        random = random.slice(-12, -1);
        document.querySelector(".p").innerHTML = `
    The coupon code  ${"#" + random}
      <img src="./images/congrat.avif" id="img4" />
    `;
      });
    }
    diceEl.classList.toggle("hide");

    diceEl.removeEventListener("click", handleClick);
    img3El.removeEventListener("click", img3Func);
  }
}

// Image 3 handler
function handelImg3() {
  img3El.addEventListener("click", img3Func);
}

function img3Func() {
  console.log("from 3");
  userDetailsEl.innerHTML = "";
  diceEl.classList.toggle("hide");
}
// Generate random number between 1-6 for the dice
function getRandom() {
  let randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
}
