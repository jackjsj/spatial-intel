// import Vue from 'vue';
// import axios from 'axios';
function androin_msg(res) {
  res = JSON.parse(res);
  console.log(res);
  $('#isDetected')
    .html(res.msg)
    .show();
  if (res.code === '13') {
    // 说明配网成功, 获取wifi信息
    const wifiInfo = res.msg[0];
    console.log(wifiInfo);
    $('#isDetected').show();
    $.get(`http://${wifiInfo.inetAddress}/device`, resp => {
      console.log(resp);
    });
  }
}
