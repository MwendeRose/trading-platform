import React from 'react';
import { ScrollView, Text } from 'react-native';
import { C } from '../theme';
import { DepositForm } from '../components/Forms';

export default function DepositScreen({ deposit }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ color: C.text, fontSize: 22, fontWeight: '800', marginBottom: 14 }}>Deposit</Text>
      <DepositForm deposit={deposit} />
    </ScrollView>
  );
}
