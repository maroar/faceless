let mainContainer = document.getElementById("mainContainer");

let listOfSlots = []

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createSlotContent(slotId) {
  let content = document.createElement("div");
  let id = `${slotId}content`;
  content.setAttribute("class", "slotContent");
  content.setAttribute("draggable", true);
  content.setAttribute("id", id);
  content.ondragstart = drag;
  content.style.backgroundColor = getRandomColor();

  return content;
}

function createSlot() {
  let slot = document.createElement("div");
  let id = `slot${listOfSlots.length}`;
  listOfSlots.push(id);
  slot.setAttribute("class", "slot");
  slot.setAttribute("id", id);
  slot.ondrop = dropSlot;
  slot.ondragover = allowDrop;
  slot.ondragleave = dragleave;

  let slotContent = createSlotContent(id);
  slot.appendChild(slotContent);

  return slot;
}

function addSlot() {
  let slot = createSlot();
  //mainContainer.appendChild(slot);
  mainContainer.insertBefore(slot, mainContainer.firstChild);
}

////////////////// DROP

function allowDrop(ev) {
  //console.error("ondragover - allowDrop");
  ev.preventDefault();
}

function drag(ev) {
  //console.error("ondragstart - drag");
  let targetId = ev.target.id;
  let targetParentId = ev.target.parentNode.id;
  ev.dataTransfer.setData("targetId", targetId);
  ev.dataTransfer.setData("targetParentId", targetParentId);
}

function dropSlot(ev) {
  //console.error("ondrop - dropSlot ", ev.target.id);
  ev.preventDefault();

  let targetDragId = ev.dataTransfer.getData("targetId");
  if (targetDragId === ev.target.id) return;
  let targetDragParentId = ev.dataTransfer.getData("targetParentId");

  let targetDrag = document.getElementById(targetDragId);
  let targetDragParent = document.getElementById(targetDragParentId);

  let targerDrop = ev.target;

  if (targerDrop.id.endsWith("content")) {
    let targerDropParent = ev.target.parentNode;
    targerDropParent.appendChild(targetDrag);
    targetDragParent.appendChild(targerDrop);
  } else {
    targerDrop.appendChild(targetDrag);
    targetDragParent.appendChild(ev.target.childNodes[0]);
  }
}

function dropContainer(ev) {
  //console.error("ondrop - dropContainer ", ev.target.id);
  ev.preventDefault();
}

function dragleave(ev) {
  //console.error("ondragleave - dragleave");
}

//////////////////
var pos1 = 0;
var pos2 = 0;
var pos3 = 0;
var pos4 = 0;
var elm = undefined;

function dragMouseDown(e) {
  //console.log("onmousedown - dragMouseDown - e.clientX: " + pos3 + " - e.clientY: " + pos4);
  e = e || window.event;
  e.preventDefault();

  pos3 = e.clientX;
  pos4 = e.clientY;

  document.onmouseup = closeDragElement;
  document.onmousemove = elementDrag;
}

function elementDrag(e) {
  //console.log("onmousemove - elementDrag");
  e = e || window.event;
  e.preventDefault();

  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;

  e.target.style.top = (e.target.offsetTop - pos2) + "px";
  e.target.style.left = (e.target.offsetLeft - pos1) + "px";
}

function closeDragElement() {
  //console.log("onmouseup - closeDragElement");
  pos1 = 0; 
  pos2 = 0; 
  pos3 = 0; 
  pos4 = 0;
  
  document.onmouseup = null;
  document.onmousemove = null;
}
