import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, StatusBar, Platform, useWindowDimensions } from 'react-native';
import { C } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import TradeScreen from './src/screens/TradeScreen';
import DepositScreen from './src/screens/DepositScreen';
import WithdrawScreen from './src/screens/WithdrawScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import WebsiteScreen from './src/screens/WebsiteScreen';
import usePlatform from './src/usePlatform';

const TABS = ['Home', 'Trade', 'Wallet', 'Profile'];

export default function App() {
  const { width } = useWindowDimensions();
  const [tab, setTab] = useState('Home');
  const [balance, setBalance] = useState(0);
  const [log, setLog] = useState([]);
  const [user, setUser] = useState(null);

  const addLog = (text) => setLog((l) => [{ id: String(Date.now()) + Math.random(), text }, ...l]);
  const deposit = (v) => { setBalance((b) => b + v); addLog(`Deposit +KES ${v.toLocaleString()}`); };
  const withdraw = (v) => { setBalance((b) => b - v); addLog(`Withdrawal -KES ${v.toLocaleString()}`); };
  const platform = usePlatform({ balance, setBalance, addLog });
  const login = (email) => { setUser({ email }); setTab('Home'); };
  const logout = () => { setUser(null); setTab('Home'); };

  if (Platform.OS === 'web' && width >= 900) {
    return <WebsiteScreen platform={platform} balance={platform.account.free} deposit={deposit} withdraw={withdraw} user={user} login={(e) => setUser({ email: e })} logout={() => setUser(null)} />;
  }

  const active = tab === 'Withdraw' ? 'Home' : tab;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        {tab === 'Home' && <HomeScreen platform={platform} log={log} setTab={setTab} />}
        {tab === 'Trade' && <TradeScreen platform={platform} />}
        {tab === 'Wallet' && <DepositScreen deposit={deposit} />}
        {tab === 'Withdraw' && <WithdrawScreen balance={Math.max(platform.account.free, 0)} withdraw={withdraw} back={() => setTab('Home')} />}
        {tab === 'Profile' && <ProfileScreen user={user} login={login} logout={logout} />}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: C.line, paddingVertical: 8 }}>
        {TABS.map((t) => (
          <Pressable key={t} accessibilityRole="button" onPress={() => setTab(t)} style={{ minHeight: 44, minWidth: 70, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: active === t ? C.orange : C.muted, fontWeight: '600', fontSize: 13 }}>{t}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
