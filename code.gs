var POST_URL =
  "https://discord.com/api/webhooks/1346835853766430781/ZVpKTFM96L4uD2iruMlS1S-Af9qNuwWr5S0ne0geZvPovLq7KQwCzX_HsqB8WH0h3l1X";

function onEdit(event) {
  var sheet_name = event.range.getSheet().getName();
  var rangeNotation = event.range.getA1Notation();
  var oldValue = event.oldValue;
  var value = event.value;
  var items = [];

  if (value == undefined && oldValue == undefined) {
    if (rangeNotation.includes(":")) {
      reason = "여러 셀 수정됨";
    } else {
      reason = "셀 삭제됨";
    }
  } else {
    if (oldValue == undefined) {
      oldValue = "공백";
    }

    if (value == undefined) {
      value = "공백";
    }
    reason = value;
  }

  items.push({
    name: "값이 변경됐어요!",
    value: "변경된 페이지: " + sheet_name + "\n변경되었습니다: " + reason,
    inline: false,
  });

  var date = Utilities.formatDate(
    new Date(),
    SpreadsheetApp.getActive().getSpreadsheetTimeZone(),
    "EEE, d MMM yyyy HH:mm:ss Z"
  );

  var options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    payload: JSON.stringify({
      content: "‌",
      embeds: [
        {
          title: "알람 등장!",
          color: 33023,
          fields: items,
        },
      ],
    }),
  };

  UrlFetchApp.fetch(POST_URL, options);
}
