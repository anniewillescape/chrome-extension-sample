const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const today = new Date();

var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

window.onload = function () {
  showProcess(today, calendar);
};

document.getElementById("prev").onclick = function () {
  showDate.setMonth(showDate.getMonth() - 1);
  showProcess(showDate);
}

document.getElementById("next").onclick = function () {
  showDate.setMonth(showDate.getMonth() + 1);
  showProcess(showDate);
}

function showProcess(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  let month_name = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
  document.querySelector('#header').innerHTML = month_name + ",  " + year;

  var calendar = createProcess(year, month);
  document.querySelector('#calendar').innerHTML = calendar;
}

function createProcess(year, month) {
  // 曜日
  var calendar = "<table><tr class='dayOfWeek'>";
  for (var i = 0; i < week.length; i++) {
    calendar += "<th>" + week[i] + "</th>";
  }
  calendar += "</tr>";

  var count = 0;
  var startDayOfWeek = new Date(year, month, 1).getDay();
  var endDate = new Date(year, month + 1, 0).getDate();
  var lastMonthEndDate = new Date(year, month, 0).getDate();
  var row = Math.ceil((startDayOfWeek + endDate) / week.length);

  for (var i = 0; i < row; i++) {
    calendar += "<tr>";
    for (var j = 0; j < week.length; j++) {
      if (i == 0 && j < startDayOfWeek) {
        calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
      } else if (count >= endDate) {
        count++;
        calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
      } else {
        count++;
        if (year == today.getFullYear()
          && month == (today.getMonth())
          && count == today.getDate()) {
          calendar += "<td class='today'>" + count + "</td>";
        } else {
          calendar += "<td>" + count + "</td>";
        }
      }
    }
    calendar += "</tr>";
  }
  return calendar;
}