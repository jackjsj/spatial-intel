function androin_msg(res) {
  console.log(res);
  res = JSON.parse(res);
  const { code } = res;
  const { wifiLinkComp } = Vue.prototype;
  switch (code) {
    case '10':
      break;
    case '13':
      // 检测到设备了
      wifiLinkComp.$data.isDetected = true;
      break;
    case '16':
      // get device请求成功
      wifiLinkComp.$data.isDetected = false;
      wifiLinkComp.$data.isAdding = true;
      wifiLinkComp.$data.deviceInfo = {
        deviceid: res.data.deviceid,
        apikey: res.data.apikey,
        chipid: res.data.chipid,
      };
      setTimeout(() => {
        wifiLinkComp.$data.finished = true;
      }, 1000);
      break;
    case '18':
      // 让设备上线成功
      break;
    default:
  }
}
