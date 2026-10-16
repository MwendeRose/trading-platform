import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { C } from '../theme';
import { PAIRS, fmtPrice } from '../market';

export default function MarketWatch({ platform, onSelect }) {
  const { prices, symbol, setSymbol } = platform;
  return (
    <View>
      <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 12 }}>
        <Text style={{ flex: 1.2, color: C.muted, fontSize: 12, fontWeight: '600' }}>Pair</Text>
        <Text style={{ flex: 1, color: C.muted, fontSize: 12, fontWeight: '600', textAlign: 'right' }}>Bid</Text>
        <Text style={{ flex: 1, color: C.muted, fontSize: 12, fontWeight: '600', textAlign: 'right' }}>Ask</Text>
      </View>
      {PAIRS.map((d) => {
        const p = prices[d.symbol];
        const col = p.dir > 0 ? C.up : p.dir < 0 ? C.down : C.text;
        const active = d.symbol === symbol;
        return (
          <Pressable key={d.symbol} accessibilityRole="button"
            onPress={() => { setSymbol(d.symbol); if (onSelect) onSelect(d.symbol); }}
            style={{ flexDirection: 'row', alignItems: 'center', minHeight: 48, paddingHorizontal: 12, borderTopWidth: 1, borderTopColor: C.line, backgroundColor: active ? '#241A10' : 'transparent' }}>
            <Text style={{ flex: 1.2, color: active ? C.orange : C.text, fontWeight: '800', fontSize: 14 }}>{d.symbol}</Text>
            <Text style={{ flex: 1, color: col, textAlign: 'right', fontSize: 14 }}>{fmtPrice(d.symbol, p.bid)}</Text>
            <Text style={{ flex: 1, color: col, textAlign: 'right', fontSize: 14 }}>{fmtPrice(d.symbol, p.ask)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
