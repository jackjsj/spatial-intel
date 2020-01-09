// 设备协议
export const rollingDoorCtrls = [
  {
    name: '上拉',
    value: 1,
    params: {
      op: 1,
    },
    icon: 'arrow-up',
    background: 'linear-gradient(132deg,rgba(207,255,238,1) 0%,rgba(98,236,158,1) 100%);',
  },
  {
    name: '下拉',
    value: 3,
    params: {
      op: 3,
    },
    icon: 'arrow-down',
    background: 'linear-gradient(136deg,rgba(255,242,213,1) 0%,rgba(242,187,132,1) 100%);',
  },
  {
    name: '暂停',
    value: 2,
    params: {
      op: 2,
    },
    icon: 'pause',
    background: 'linear-gradient(129deg,rgba(254,227,218,1) 0%,rgba(248,135,147,1) 100%);',
  },
];
