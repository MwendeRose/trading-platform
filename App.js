import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, StatusBar, Platform, useWindowDimensions } from 'react-native';
import { C } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import TradeScreen from './src/screens/TradeScreen';
import DepositScreen from './src/screens/DepositScreen';
import WebsiteScreen from './src/screens/WebsiteScreen';

const TABS = ['Home', 'Trade', 'Wallet'];

export default function App() {
  const { width } = useWindowDimensions();
  const [tab, setTab] = useState('Home');
  const [balance, setBalance] = useState(0);
  const [log, setLog] = useState([]);
  const deposit = (v) => {
    setBalance((b) => b + v);
    setLog((l) => [{ id: String(Date.now()), text: `Deposit +KES ${v.toLocaleString()}` }, ...l]);
  };

  if (Platform.OS === 'web' && width >= 900) return <WebsiteScreen />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        {tab === 'Home' && <HomeScreen balance={balance} log={log} setTab={setTab} />}
        {tab === 'Trade' && <TradeScreen />}
        {tab === 'Wallet' && <DepositScreen deposit={deposit} />}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: C.line, paddingVertical: 8 }}>
        {TABS.map((t) => (
          <Pressable key={t} accessibilityRole="button" onPress={() => setTab(t)} style={{ minHeight: 44, minWidth: 80, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: tab === t ? C.orange : C.muted, fontWeight: '600', fontSize: 13 }}>{t}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}