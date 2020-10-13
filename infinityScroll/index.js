const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let pages = [];
let lastPageLoaded;

// create data
list.forEach(num => {
  let newPage = [];
  list.forEach(n => newPage.push(num+'-line-'+n));
  pages.push(newPage);
});

function handleTopLimit() {
return pages[lastPageLoaded++].join('\n') + '\n';
}

function handleBottomLimit() {
return pages[lastPageLoaded++].join('\n') + '\n';
}

// on scroll event
function onScrollHandler(e) {
let widget = document.getElementById("widget");
let activated = document.getElementById("activated").checked;
if (activated
&& widget.scrollTop + widget.clientHeight === widget.scrollHeight
&& lastPageLoaded < pages.length) {
widget.value += handleBottomLimit();
}
/*else if (activated && widget.scrollTop === 0) {
widget.value = handleTopLimit();
}*/
}

// setup
function init() {
  lastPageLoaded = 0;
  let widget = document.getElementById("widget");
  widget.value = pages[lastPageLoaded++].join('\n') + '\n';
  widget.addEventListener("scroll", onScrollHandler);
}
