export interface FProgressProps {
  percent: number; //百分比,
  vertical?: boolean; //进度条是否垂直，true垂直
  disableTransition?: boolean;//是否禁用进度条动画
  strokeWidth?: string | number,//自定义进度条宽度
  trackColor?: string;//进度条背景颜色
  strokeColor?: string | string[];//进度条颜色
}
