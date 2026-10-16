import React from 'react';
import Svg, { Polyline, Polygon, Line } from 'react-native-svg';
import { C } from '../theme';

export default function Chart({ data, height = 180 }) {
  const W = 400, H = 180, pad = 12;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const xy = data.map((v, i) => `${(i * W) / (data.length - 1)},${pad + (H - 2 * pad) * (1 - (v - min) / span)}`);
  const lastY = xy[xy.length - 1].split(',')[1];
  return (
    <Svg width="100%" height={height} viewBox="0 0 400 180" preserveAspectRatio="none" accessibilityLabel="Live price chart">
      {[30, 75, 120, 165].map((y) => <Line key={y} x1="0" x2="400" y1={y} y2={y} stroke={C.line} strokeWidth="1" />)}
      <Polygon points={`${xy.join(' ')} 400,180 0,180`} fill={C.orange} fillOpacity="0.12" />
      <Polyline points={xy.join(' ')} fill="none" stroke={C.orange} strokeWidth="2" />
      <Line x1="0" x2="400" y1={lastY} y2={lastY} stroke={C.orange} strokeWidth="1" strokeDasharray="4 4" />
    </Svg>
  );
}
