import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { C } from '../theme';
import { Btn, Chip, Field, Card } from './ui';
import Chart from './Chart';
import { PAIRS, def, fmtPrice, kes, marginKES, kesRate } from '../market';

const Stat = ({ label, value, color }) => (
  <View style={{ flexGrow: 1, flexBasis: 140, paddingVertical: 6 }}>
    <Text style={{ color: C.muted, fontSize: 12 }}>{label}</Text>
    <Text style={{ color: color || C.text, fontSize: 15, fontWeight: '800' }}>{value}</Text>
  </View>
);

export default function Terminal({ platform, compact, onOpened }) {
  const { symbol, setSymbol, prices, series, account, openOrder, positions, history, closePosition } = platform;
  const [lots, setLots] = useState('0.01');
  const [msg, setMsg] = useState('');
  const p = prices[symbol];
  const d = def(symbol);
  const lotsNum = parseFloat(lots);
  const margin = lotsNum > 0 ? marginKES(symbol, lotsNum, p.mid, kesRate(prices)) : 0;
  const trend = series[symbol][series[symbol].length - 1] >= series[symbol][0] ? C.up : C.down;

  const place = (side) => {
    const r = openOrder(side, lotsNum);
    setMsg(r.ok ? r.msg : r.error);
    if (r.ok && onOpened) onOpened();
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {PAIRS.map((x) => <Chip key={x.symbol} title={x.symbol} active={x.symbol === symbol} onPress={() => { setSymbol(x.symbol); setMsg(''); }} />)}
        </View>
      </ScrollView>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
        <View>
          <Text style={{ color: C.text, fontSize: 22, fontWeight: '800' }}>{symbol}</Text>
          <Text style={{ color: C.muted, fontSize: 12 }}>Spread {d.spread.toFixed(1)} pips · Simulated prices</Text>
        </View>
        <Text style={{ color: trend, fontSize: 24, fontWeight: '800' }}>{fmtPrice(symbol, p.mid)}</Text>
      </View>

      <Chart data={series[symbol]} />

      <View style={{ marginTop: 14 }}>
        <Field label="Volume (lots)" value={lots} onChangeText={(t) => { setLots(t); setMsg(''); }} keyboardType="decimal-pad" placeholder="0.01" />
        <View style={{ flexDirection: 'row', gap: 8, marginTop: -4, marginBottom: 14 }}>
          {['0.01', '0.05', '0.10', '0.50'].map((v) => <Chip key={v} title={v} active={lots === v} onPress={() => { setLots(v); setMsg(''); }} />)}
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Btn title={`Sell\n${fmtPrice(symbol, p.bid)}`} variant="light" style={{ flex: 1, minHeight: 64 }} onPress={() => place('Sell')} />
        <Btn title={`Buy\n${fmtPrice(symbol, p.ask)}`} style={{ flex: 1, minHeight: 64 }} onPress={() => place('Buy')} />
      </View>
      <Text style={{ color: C.muted, fontSize: 13, marginTop: 10 }}>
        Margin required {kes(margin, 2)} · Free margin {kes(Math.max(account.free, 0))}
      </Text>
      {!!msg && <Text style={{ color: C.orange, fontSize: 13, marginTop: 8, lineHeight: 20 }}>{msg}</Text>}

      {!compact && (
        <View style={{ marginTop: 24, gap: 16 }}>
          <Card>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Stat label="Balance" value={kes(account.balance, 2)} />
              <Stat label="Equity" value={kes(account.equity, 2)} />
              <Stat label="Floating P/L" value={kes(account.floating, 2)} color={account.floating >= 0 ? C.up : C.down} />
              <Stat label="Margin used" value={kes(account.used, 2)} />
              <Stat label="Free margin" value={kes(Math.max(account.free, 0), 2)} />
            </View>
          </Card>

          <Text style={{ color: C.text, fontSize: 18, fontWeight: '800' }}>Open positions</Text>
          {positions.length === 0 && <Text style={{ color: C.muted }}>No open positions. Place a Buy or Sell order above.</Text>}
          {positions.map((po) => {
            const pnl = account.pnl[po.id] || 0;
            const cur = prices[po.symbol];
            return (
              <Card key={po.id}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: C.text, fontWeight: '800' }}>{po.symbol} · {po.side} {po.lots}</Text>
                    <Text style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>
                      Open {fmtPrice(po.symbol, po.entry)} · Now {fmtPrice(po.symbol, po.side === 'Buy' ? cur.bid : cur.ask)}
                    </Text>
                  </View>
                  <Text style={{ color: pnl >= 0 ? C.up : C.down, fontWeight: '800' }}>{pnl >= 0 ? '+' : ''}{kes(pnl, 2)}</Text>
                  <Btn title="Close" variant="outline" style={{ minHeight: 40, paddingHorizontal: 14 }} onPress={() => closePosition(po.id)} />
                </View>
              </Card>
            );
          })}

          <Text style={{ color: C.text, fontSize: 18, fontWeight: '800' }}>Trade history</Text>
          {history.length === 0 && <Text style={{ color: C.muted }}>Closed trades appear here.</Text>}
          {history.map((h) => (
            <View key={h.id} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: C.line }}>
              <Text style={{ color: C.text, flex: 1 }}>{h.symbol} {h.side} {h.lots}</Text>
              <Text style={{ color: C.muted, flex: 1, fontSize: 12 }}>{fmtPrice(h.symbol, h.entry)} → {fmtPrice(h.symbol, h.exit)}</Text>
              <Text style={{ color: h.pnl >= 0 ? C.up : C.down, fontWeight: '800' }}>{h.pnl >= 0 ? '+' : ''}{kes(h.pnl, 2)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
