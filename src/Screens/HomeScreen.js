import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { C, BRAND, INSTRUMENTS, PRICE } from '../theme';
import { Btn, Card } from '../components/ui';

export default function HomeScreen({ balance, log, setTab }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 18 }}>
      <Text style={{ color: C.orange, fontSize: 20, fontWeight: '800' }}>{BRAND}</Text>
      <View style={{ backgroundColor: C.orange, borderRadius: 16, padding: 22 }}>
        <Text style={{ color: C.onOrange, fontWeight: '600' }}>Available balance</Text>
        <Text style={{ color: C.onOrange, fontSize: 34, fontWeight: '800', marginVertical: 6 }}>KES {balance.toLocaleString()}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Btn title="Deposit" variant="dark" style={{ flex: 1 }} onPress={() => setTab('Wallet')} />
          <Btn title="Withdraw" variant="light" style={{ flex: 1, borderColor: C.onOrange }} onPress={() => {}} />
        </View>
      </View>
      <Text style={{ color: C.text, fontSize: 18, fontWeight: '800' }}>Markets</Text>
      {INSTRUMENTS.map((s) => (
        <Card key={s} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: C.text, fontWeight: '600' }}>{s}</Text>
          <Text style={{ color: C.muted }}>{PRICE}</Text>
        </Card>
      ))}
      <Text style={{ color: C.text, fontSize: 18, fontWeight: '800' }}>Recent activity</Text>
      {log.length === 0 && <Text style={{ color: C.muted }}>No transactions yet.</Text>}
      {log.map((l) => <Text key={l.id} style={{ color: C.text }}>{l.text}</Text>)}
    </ScrollView>
  );
}