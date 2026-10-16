import React from 'react';
import { ScrollView, Text } from 'react-native';
import { C } from '../theme';
import { Btn } from '../components/ui';
import { WithdrawForm } from '../components/Forms';

export default function WithdrawScreen({ balance, withdraw, back }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Btn title="Back" variant="light" style={{ minHeight: 44, alignSelf: 'flex-start', marginBottom: 16 }} onPress={back} />
      <Text style={{ color: C.text, fontSize: 22, fontWeight: '800', marginBottom: 4 }}>Withdraw</Text>
      <Text style={{ color: C.muted, marginBottom: 16 }}>Available balance: KES {balance.toLocaleString()}</Text>
      <WithdrawForm balance={balance} withdraw={withdraw} />
    </ScrollView>
  );
}
