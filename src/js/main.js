let inputFloors = document.getElementById("inputFloors")
let inputLifts = document.getElementById("inputLifts")
let form = document.getElementById("form")
let submit = document.getElementById("inputButton")
let container = document.getElementById("container")
let lifts =[]
let queue = []
let busyLift = []
let liftRequests = []

form.addEventListener("click", e => e.preventDefault());
// START here
const start = () => {
	//console.log("working")
	createFloors();
	createLifts();
}
submit.addEventListener("click", start);

// Create Floors
const createFloors = () => {
	totalFloors = inputFloors.value;
	totalFloors.innerText = ""
	let makeFloors = []
	for (let i = 1; i <= totalFloors; i++) {
		makeFloors.push(i)
		// console.log(i)
		// container.appendChild(floor);
	  }
	  let floor = document.getElementById("floor");
	  floor.innerHTML = makeFloors.map((item, i) => { 
		return `
		<div class="floor" id="floor">
		  <button class="control-btn control-btn-up" dataFloor="${i+1}" onclick = "getButtons(${i+1})">UP</button>
		  <br>
		  <button class="control-btn control-btn-down" dataFloor="${i+1}" onclick ="getButtons(${i+1})" >DOWN</button>
		  <span class="floor-number">Floor-${i+1}</span>
		  </div>
		  <hr>
		`
	  })
	  .join("");
	};

const onClickOpenLift = (freeLiftIndex) => {
  const liftDoorLeft = document.querySelector(`[data-lift="${freeLiftIndex}"] .lift-door-left`);
  const liftDoorRight = document.querySelector(`[data-lift="${freeLiftIndex}"] .lift-door-right`);
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
	//console.log(totalLifts)
	let makeLifts = []
	for (let i = 1; i <= totalLifts; i++) {
		makeLifts.push(i)
		// console.log(i)
		busyLift = [...busyLift, { lift: i + 1, busy: false, currentFloor: 0 }];
	  }
	  let lift = document.getElementById("lift");
	  lift.innerHTML = makeLifts.map((item, i) => { 
		//console.log(i)
		return `
		<div class="lift" data-lift=${i}>
        <div class="lift-door lift-door-left"></div>
        <div class="lift-door lift-door-right"></div>
		</div>	
		`
	  })
	  .join("")
}

const getButtons = (data) => {
	const targetFloor = data
	//console.log(targetFloor)
	liftRequests = [...liftRequests, targetFloor];
	//console.log(liftRequests)

	for (let i = 0; i < liftRequests.length; i++) {
		moveLifts(targetFloor)
	  }

}

function changeLiftStatusToFalse(liftIndex) {
	let data = busyLift.map((item, index) =>
	  index === liftIndex ? { ...item, busy: false } : item
	);
	busyLift = data;
	liftRequests.shift();
	if (liftRequests.length > 0) {
	  moveLifts(liftRequests[0]);
	}
  }
  
  function changeLiftStatusToTrue(liftIndex) {
	let data = busyLift.map((item, index) =>
	  index === liftIndex ? { ...item, busy: true } : item
	);
	busyLift = data;
  }

const moveLifts = (targetFloor) => {

	const freeLiftIndex = getShortestDistance(targetFloor)
	console.log(freeLiftIndex)
	if (freeLiftIndex < 0) {
		return
	}
	else{
		const lift = document.querySelector(`[data-lift="${freeLiftIndex}"]
	`);
	changeLiftStatusToTrue(freeLiftIndex)

	const floorHeight = 168; // height of each floor in pixels
	const targetPosition = (targetFloor - 1) * floorHeight;
	console.log(targetPosition)
	const time = targetFloor*2000
	lift.style.transform = `translateY(-${targetPosition}px)`;
	console.log(targetFloor*2000)
	lift.style.transition = `transform ${time}ms ease-in-out`;
	setTimeout(() => {
		onClickOpenLift(freeLiftIndex);
		setTimeout(() => {
			changeLiftStatusToFalse(freeLiftIndex)
		}, 5000);
	}, time); 
	busyLift[freeLiftIndex].currentFloor = targetFloor;
	}
	
}

const getShortestDistance = (floor) => {
	let getShortestDistanceLiftIndex = 0;
  let data = Math.abs(busyLift[0].currentFloor - floor);
  for (let i = 1; i < busyLift.length; i++) {
    if (data > Math.abs(busyLift[i].currentFloor - floor)) {
      getShortestDistanceLiftIndex = i;
      data = Math.abs(busyLift[i].currentFloor - floor);
    }
  }
  console.log(getShortestDistanceLiftIndex)
  // if lift is busy
		if (busyLift[getShortestDistanceLiftIndex].busy === false)
			return getShortestDistanceLiftIndex;
  // free lift
  else {
		let getLiftIndex = busyLift.findIndex((item) => item.busy === false);
		return getLiftIndex;
  }
}

// getting all lifts and then filtering all free ones and then finding the nearest lift and finally moving to destination
// function moveLiftTo(targetFloor) {
// 	const lifts = Array.from(document.getElementsByClassName("lift"));
// 	const liftAv = lifts.filter((lift) => lift.dataset.status === "free");
// 	if (liftAv.length === 0) {
// 	  console.log("not av lifts");
// 	  return false;
// 	}
// }
// //   // cheking for all button click events
//   addEventListener("click", (e) => {
// 	if (
// 	  e.target.classList.contains("control-btn-up") ||
// 	  e.target.classList.contains("control-btn-down")
// 	) {
// 		console.log(e)
// 	  liftReqQueue.push(e.target.dataset.floorno);
// 	  console.log("reqQ = " + liftReqQueue);
// 	}
//   });
  
//   // regularly checking for requests in queue and fulfilling when lift free
//   setInterval(() => {
// 	if (liftReqQueue.length) {
// 	  const moveToFloor = liftReqQueue[0];
// 	  const res = moveLiftTo(moveToFloor);
// 	  if (res) liftReqQueue.shift();
// 	}
// 	return;
//   }, 1000);
  