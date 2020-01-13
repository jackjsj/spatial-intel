/**
 * websocket封装
 */
export class WsHelper {
  constructor(options) {
    this.options = options;
    this.connectWebsocket();
  }

  connectWebsocket() {
    const { domain, port, onopen, onmessage } = this.options;
    const ws = new WebSocket(`wss://${domain}:${port}/api/ws`);
    // 监听连接成功
    ws.onopen = () => {
      // 握手
      this.shakeHands();
      onopen();
    };
    // 监听服务端消息(接收消息)
    ws.onmessage = onmessage;
    // 监听连接失败
    ws.onerror = () => {
      console.log('连接失败，正在重连...');
      this.connectWebsocket(this.options);
    };
    // 监听连接关闭
    ws.onclose = () => {
      console.log('连接关闭');
    };
    this.ws = ws;
    return ws;
  }

  /**
   * 握手
   */
  shakeHands() {
    const { at, appid, apikey } = this.options;
    // 握手
    this.ws.send(
      JSON.stringify({
        action: 'userOnline',
        at,
        apikey,
        appid,
        nonce: 'absfefds',
        ts: Math.round(new Date().getTime() / 1000),
        userAgent: 'app',
        sequence: +new Date(),
        version: 8,
      }),
    );
  }

  /**
   * 关闭
   */
  close() {
    this.ws && this.ws.close();
  }
}
