// 设备协议
export const rollingDoorPtl = [
  {
    name: '上拉',
    actionParams: {
      op: 1,
    },
  },
  {
    name: '下拉',
    actionParams: {
      op: 3,
    },
  },
  {
    name: '锁定',
    actionParams: {
      lock: 1, // 0代表未锁，1代表锁机械开关和遥控器，2代表只锁机械开关
    },
  },
  {
    name: '停止',
    actionParams: {
      op: 2,
    },
  },
];
