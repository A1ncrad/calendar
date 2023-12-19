const modal = document.querySelector(".modal");
const modalChild = modal.querySelectorAll(".modal__child");

const clock = document.getElementById("clock");
const main = document.querySelector(".main");
const next = document.getElementById("arrow-next");
const prev = document.getElementById("arrow-prev");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augest",
  "September",
  "October",
  "November",
  "December",
];
const today = new Date();
let currentMonth = today.getMonth();

setInterval(() => {
  let now = new Date();
  let hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  let minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  let seconds =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  clock.innerHTML = hours + ":" + minutes + ":" + seconds;
}, 1000);

let dayOfMonth = 1;

createCalendar(main, today.getFullYear(), today.getMonth());

function createCalendar(elem, year, m) {
  let month = new Date(year, m);

  let table = document.createElement("table");
  table.className = "calendar";
  elem.insertBefore(table, next);

  createCaption(table, month);

  for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
    let row = document.createElement("tr");
    table.append(row);

    if (rowIndex == 0) {
      createTheader(row);
      continue;
    } else {
      createCells(month, row, rowIndex);
    }
  }

  if (m == 11) {
    document.documentElement.style.setProperty("--text-cl", "#f88");
    document.documentElement.style.setProperty("--bg-cl", "#f44");
    document.documentElement.style.setProperty("--caption-cl", "#f66");
  }

  dayOfMonth = 1;
}

function createCaption(table, month) {
  let caption = document.createElement("caption");

  const captionYear = month.getFullYear();
  const captionMonth = months[month.getMonth()];

  caption.textContent = ` ${captionMonth} ${captionYear}`;
  table.append(caption);
}

function createTheader(row) {
  let week = ["mo", "tu", "we", "th", "fr", "sa", "su"];

  for (let day of week) {
    let th = document.createElement("th");
    th.className = "day";
    th.textContent = day;
    row.append(th);
  }
}

function createCells(date, row, rowIndex) {
  let firstDay = date.getDay() == 0 ? 6 : date.getDay() - 1;
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  let isCurrentMonth = currentMonth === today.getMonth();

  for (let cellIndex = 0; cellIndex < 7; cellIndex++) {
    let beforeFirstDay = rowIndex == 1 && cellIndex < firstDay;
    let afterLastDay = dayOfMonth > lastDay;

    let cell = document.createElement("td");
    row.append(cell);

    if (beforeFirstDay || afterLastDay) continue;
    cell.className = "date";
    if (dayOfMonth === today.getDate() && isCurrentMonth)
      cell.classList.add("current");
    cell.textContent = dayOfMonth++;
  }
}

document.addEventListener("click", handleClick);

function handleClick(e) {
  if (!e.target.matches(".date")) return;


  document.querySelector(".active")?.classList.remove("active");
  e.target.classList.add("active");

  modal.style.display = "block";
  modal.style.top = e.target.offsetTop + "px";
  modal.style.left = e.target.offsetLeft + e.target.offsetWidth + "px";


  index = parseInt(e.target.textContent) - 1;

	const prev = modal.querySelector(".modal__child.active");
	prev?.classList?.remove("active");

  const current = modalChild[index];
	current.classList.add("active")

}

next.onclick = nextMonth;
prev.onclick = prevMonth;

function nextMonth() {
  currentMonth++;
  document.querySelector(".calendar").remove();
  createCalendar(main, new Date().getFullYear(), currentMonth);
}

function prevMonth() {
  currentMonth--;
  document.querySelector(".calendar").remove();
  createCalendar(main, new Date().getFullYear(), currentMonth);
}

document.addEventListener("click", (e) => {

  if (e.target.className == "modal__close") close();
});

function close() {
  modal.style.display = "none";
  modal.querySelector(".modal__child.active").classList.remove("active");
}
