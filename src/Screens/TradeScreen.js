import React from 'react';
import { ScrollView } from 'react-native';
import Terminal from '../components/Terminal';

export default function TradeScreen({ platform }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Terminal platform={platform} />
    </ScrollView>
  );
}
