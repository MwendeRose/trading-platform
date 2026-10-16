import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { C, INSTRUMENTS, PRICE } from '../theme';
import { Btn, Chip, Field } from './ui';
import Chart from './chart';

// Shared by the website hero and the app Trade screen.
export default function Trader({ withVolume }) {
  const [sym, setSym] = useState('EUR/USD');
  const [tf, setTf] = useState('1H');
  const [lots, setLots] = useState('');
  const [msg, setMsg] = useState('');
  const order = (side) => {
    const v = parseFloat(lots || '0.01');
    if (!(v > 0)) return setMsg('Enter a volume above 0');
    // Demo only: send this to your broker or order-routing backend.
    setMsg(`Demo order: ${side} ${v} lot ${sym}`);
  };
  return (
    <View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {INSTRUMENTS.slice(0, 3).map((s) => <Chip key={s} title={s} active={s === sym} onPress={() => setSym(s)} />)}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <Text style={{ color: C.text, fontSize: 28, fontWeight: '800' }}>{PRICE}</Text>
        <Text style={{ color: C.muted, fontSize: 13 }}>Illustrative chart</Text>
      </View>
      <Chart />
      <View style={{ flexDirection: 'row', gap: 6, marginVertical: 12 }}>
        {['1H', '4H', '1D', '1W'].map((t) => <Chip key={t} title={t} active={t === tf} onPress={() => setTf(t)} />)}
      </View>
      {withVolume && <Field label="Volume (lots)" placeholder="0.01" value={lots} onChangeText={setLots} keyboardType="decimal-pad" />}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Btn title="Sell" variant="light" style={{ flex: 1 }} onPress={() => order('Sell')} />
        <Btn title="Buy" style={{ flex: 1 }} onPress={() => order('Buy')} />
      </View>
      {!!msg && <Text style={{ color: C.muted, fontSize: 13, marginTop: 10 }}>{msg}</Text>}
    </View>
  );
}