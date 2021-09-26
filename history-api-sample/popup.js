document.addEventListener("DOMContentLoaded", function () {
  // SEARCHイベントのクリックイベント設定
  let divs = document.querySelectorAll("#search-text");
  divs[0] = divs[0].addEventListener("keyup", searchClickEvent);
});

// SEARCHクリックイベント
function searchClickEvent(e) {
  let ul = document.querySelector("#history-list");
  let span = document.querySelector("#hit-count");
  let searchText = document.querySelector("#search-text");
  let html = "";
  let microsecondsPerDay = 1000 * 60 * 60 * 24;
  let searchStartDate = new Date().getTime() - microsecondsPerDay * 365 * 2;

  // TODO:startTime, endTimeをテキストボックスから指定
  let searchQuery = {
    text: searchText.value,
    startTime: searchStartDate,
    maxResults: 30,
  };

  // 履歴取得
  chrome.history.search(searchQuery, function (historyItems) {
    let cnt = 0;

    if (searchQuery.text == "") {
      span.innerHTML = "";
      ul.innerHTML = "";
    } else {
      // 履歴の数だけループし、検索結果を表示
      historyItems.forEach(function (historyItem) {
        cnt++;
        var domain = historyItem.url.match(
          /^[httpsfile]+:\/{2,3}([0-9a-z\.\-:]+?):?[0-9]*?\//i
        )[1];
        html +=
          "<tr><td id='icon'><img src='https://www.google.com/s2/favicons?domain=" +
          domain +
          "'></img></td>" +
          "<td><a href='" +
          historyItem.url +
          "' target='_blank'>" +
          historyItem.title +
          "<br><span class='hit-url'>" +
          historyItem.url +
          "</span></a></td></tr>";
      });
      span.innerHTML = "結果上位 " + cnt + "件を表示しています";
      ul.innerHTML = html;
    }
  });
}
