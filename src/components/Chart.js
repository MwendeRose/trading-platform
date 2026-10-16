import React from 'react';
import Svg, { Polyline, Polygon, Line } from 'react-native-svg';
import { C } from '../theme';

const points = [140, 120, 130, 95, 105, 70, 85, 50, 62, 35, 45];

export default function Chart({ height = 180 }) {
  const W = 400;
  const xy = points.map((y, i) => `${(i * W) / (points.length - 1)},${y}`);
  return (
    <Svg width="100%" height={height} viewBox="0 0 400 180" preserveAspectRatio="none" accessibilityLabel="Illustrative price chart">
      {[30, 75, 120, 165].map((y) => <Line key={y} x1="0" x2="400" y1={y} y2={y} stroke={C.line} strokeWidth="1" />)}
      <Polygon points={`${xy.join(' ')} 400,180 0,180`} fill={C.orange} fillOpacity="0.15" />
      <Polyline points={xy.join(' ')} fill="none" stroke={C.orange} strokeWidth="2.5" />
    </Svg>
  );
}