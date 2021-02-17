export interface FProgressProps {
  percent: number; //百分比,
  vertical?: boolean; //进度条是否垂直，true垂直
  loading?: boolean; //进度条是否处于加载状态
  allowClick?: boolean;
  allowDrag?: boolean;
  disableTransition?: boolean; //是否禁用进度条动画
  strokeWidth?: string | number; //自定义进度条宽度
  trackColor?: string; //进度条背景颜色
  strokeColor?: string | string[]; //进度条颜色
  thumb?: boolean; //进度条是否显示thumb
  hoverShowThumb?: boolean; //设置thumb当鼠标hover时才显示
  thumbColor?: string; //滑块背景色
  thumbWidth?: string | number;
  showthumbCircle?: boolean; //是否显示滑块圆心
  thumbCircleColor?: string; //滑块圆心背景色
  onChange?: (percent: number, isDrag: boolean) => any;//isDrag是否是拖拽导致的change
  onDragStart?: () => any;//开始拖拽
  onDragEnded?: () => any;//拖拽结束
}

export interface RectPos {
  bottom: number;
  left: number;
  width: number;
  height: number;
  [propname: string]: any;
}

export const defaultRectPos = {
  bottom: 0,
  left: 0,
  width: 0,
  height: 0
};
