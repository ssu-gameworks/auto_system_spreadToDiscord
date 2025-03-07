var POST_URL =
  "https://discord.com/api/webhooks/1347450173797957745/hUdSr6k4Op1mJ27iac_-gf4IZCGOs426WCqpGADDKMAIl-IIJ-3mZhsKZcmEBUW7k1jl";

function onFormSubmit(e) {
  var sheet = e.source.getActiveSheet(); // 현재 시트 가져오기
  var lastRow = sheet.getLastRow(); // 마지막 행 가져오기
  var totalApplicants = lastRow - 1; // 첫 번째 행 제외한 지원자 수 계산

  var rowData = e.values; // 새로 추가된 행의 데이터 가져오기

  var joinTime = rowData[0]; // A열 (가입 시간)
  var studentId = rowData[1]; // B열 (학번)
  var name = rowData[2]; // C열 (이름)
  var contact = rowData[3]; // D열 (연락처)

  // 메시지 생성
  var message =
    name +
    "님이 가입했어요🎉🎉.\n" +
    '정보는 다음과 같습니다: \n\n가입시간 "' +
    joinTime +
    '", \n학번: "' +
    studentId +
    '", \n연락처: "' +
    contact +
    '"\n\n 지금까지 총 ' +
    totalApplicants +
    "명이 지원했어요!"; // 첫 번째 행 제외한 총 지원자 수 표시

  var items = [
    {
      name: "신규 가입 알림",
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
