let inputFloors = document.getElementById("inputFloors")
let inputLifts = document.getElementById("inputLifts")
let form = document.getElementById("form")
let submit = document.getElementById("inputButton")
let container = document.getElementById("container")
let lifts =[]
let queue = []

form.addEventListener("click", e => e.preventDefault());
// START here
const start = () => {
	console.log("working")
	// onClickOpenLift()
	createFloors();
	createLifts();

}
submit.addEventListener("click", start);

// Create Floors
const createFloors = () => {
	totalFloors = inputFloors.value;
	totalFloors.innerText = ""
	let dummyFloors = []
	for (let i = 1; i <= totalFloors; i++) {
		dummyFloors.push(i)
		// console.log(i)
		// container.appendChild(floor);
	  }
	  let floor = document.getElementById("floor");
	  floor.innerHTML = dummyFloors.map((item, i) => { 
		return `
		<div class="floor" id="floor">
		  <button class="control-btn control-btn-up" CurrentData="${i+1}">UP</button>
		  <br>
		  <button class="control-btn control-btn-down" CurrentData="${i+1}">DOWN</button>
		  <span class="floor-number">Floor-${i+1}</span>
		  </div>
		  <hr>
		`
	  })
	  .join("")
	

	};
const onClickOpenLift = () => {
  const liftDoorLeft = document.querySelector(".lift-door-left");
  const liftDoorRight = document.querySelector(".lift-door-right");
  liftDoorLeft.style.width = "0px";
  liftDoorRight.style.width = "0px";

  setTimeout(() => {
    liftDoorLeft.style.width = "50%";
    liftDoorRight.style.width = "50%";
  }, 2500);
}

// Create Lifts
const createLifts = () => {
	let totalLifts = inputLifts.value;
	totalLifts.innerText = ""
	console.log(totalLifts)
	let dummyLifts = []
	for (let i = 1; i <= totalLifts; i++) {
		dummyLifts.push(i)
		// console.log(i)
	  }
	  let lift = document.getElementById("lift");
	  lift.innerHTML = dummyLifts.map((item, i) => { 
		console.log(i)
		return `
		<div class="lift" onclick="onClickOpenLift()">
        <div class="lift-door lift-door-left"></div>
        <div class="lift-door lift-door-right"></div>
		</div>	
		`
	  })
	  .join("")
}
// Check Queue 
const checkQueue = () => { 

}
// Move Lift 
const movementOfLift = () => {

}
//Door Animation
const doorAnimation = () => {

}