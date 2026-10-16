import React from 'react';
import { ScrollView, Text } from 'react-native';
import { C } from '../theme';
import Trader from '../components/Trader';

export default function TradeScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ color: C.text, fontSize: 22, fontWeight: '800', marginBottom: 14 }}>Trade</Text>
      <Trader withVolume />
    </ScrollView>
  );
}