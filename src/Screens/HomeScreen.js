import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { C, BRAND } from '../theme';
import { Btn } from '../components/ui';
import MarketWatch from '../components/MarketWatch';
import { kes } from '../market';

export default function HomeScreen({ platform, log, setTab }) {
  const { account } = platform;
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 18 }}>
      <Text style={{ color: C.orange, fontSize: 20, fontWeight: '800' }}>{BRAND}</Text>
      <View style={{ backgroundColor: C.orange, borderRadius: 16, padding: 22 }}>
        <Text style={{ color: C.onOrange, fontWeight: '600' }}>Equity</Text>
        <Text style={{ color: C.onOrange, fontSize: 32, fontWeight: '800', marginVertical: 4 }}>{kes(account.equity, 2)}</Text>
        <Text style={{ color: C.onOrange, marginBottom: 14 }}>Balance {kes(account.balance, 2)} · Floating {kes(account.floating, 2)}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Btn title="Deposit" variant="dark" style={{ flex: 1 }} onPress={() => setTab('Wallet')} />
          <Btn title="Withdraw" variant="light" style={{ flex: 1, borderColor: C.onOrange }} onPress={() => setTab('Withdraw')} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: C.text, fontSize: 18, fontWeight: '800' }}>Markets</Text>
        <Pressable accessibilityRole="button" onPress={() => setTab('Trade')} style={{ minHeight: 44, justifyContent: 'center' }}>
          <Text style={{ color: C.orange, fontWeight: '600' }}>Open trading</Text>
        </Pressable>
      </View>
      <MarketWatch platform={platform} onSelect={() => setTab('Trade')} />
      <Text style={{ color: C.text, fontSize: 18, fontWeight: '800' }}>Recent activity</Text>
      {log.length === 0 && <Text style={{ color: C.muted }}>No activity yet.</Text>}
      {log.slice(0, 8).map((l) => <Text key={l.id} style={{ color: C.text }}>{l.text}</Text>)}
    </ScrollView>
  );
}
