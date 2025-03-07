var POST_URL =
  "https://discord.com/api/webhooks/1347450173797957745/hUdSr6k4Op1mJ27iac_-gf4IZCGOs426WCqpGADDKMAIl-IIJ-3mZhsKZcmEBUW7k1jl";

function onEdit(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();

  // 현재 행의 A~D열 데이터를 가져옴 (A: 가입시간, B: 학번, C: 이름, D: 연락처)
  var rowData = sheet.getRange(row, 1, 1, 4).getValues()[0];
  var joinTime = rowData[0];
  var studentId = rowData[1];
  var name = rowData[2];
  var contact = rowData[3];

  // 가입시간이 Date 객체라면 지정한 포맷의 문자열로 변환 (예: "2025. 2. 24 오후 7:30:22")
  if (joinTime instanceof Date) {
    joinTime = Utilities.formatDate(
      joinTime,
      SpreadsheetApp.getActive().getSpreadsheetTimeZone(),
      "yyyy. M. d a h:mm:ss"
    );
  }

  // 메시지 구성: 예) "홍길동님이 가입했습니다. 정보는 다음과 같습니다: 가입시간 "2025. 2. 24 오후 7:30:22", 학번: "20241851", 연락처: "010-1234-5678""
  var message =
    name +
    "님이 신청했어요❗️❗️.\n" +
    '정보는 다음과 같습니다: \n\n가입시간 "' +
    joinTime +
    '", \n학번: "' +
    studentId +
    '", \n연락처: "' +
    contact +
    '"';

  var items = [
    {
      name: "신규 신청 알림",
      value: message,
      inline: false,
    },
  ];

  var options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    payload: JSON.stringify({
      content: "",
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
