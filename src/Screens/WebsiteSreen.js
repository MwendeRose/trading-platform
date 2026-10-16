import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { C, BRAND, INSTRUMENTS, PRICE } from '../theme';
import { Btn, Card } from '../components/ui';
import Trader from '../components/Trader';

const FEATURES = [
  ['Instant deposits', 'Pay from your M-Pesa and see funds in your wallet once confirmed.'],
  ['Practice first', 'Learn on a demo account with virtual money before risking your own.'],
  ['Verified and secure', 'Identity checks and a full record of every transaction on your account.'],
];

export default function WebsiteScreen() {
  return (
    <ScrollView style={{ backgroundColor: C.bg }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingVertical: 20, paddingHorizontal: 80, borderBottomWidth: 1, borderBottomColor: C.line }}>
        <Text style={{ color: C.orange, fontSize: 22, fontWeight: '800' }}>{BRAND}</Text>
        <View style={{ flexDirection: 'row', gap: 28 }}>
          {['Markets', 'Platforms', 'Deposits', 'Learn'].map((l) => <Text key={l} style={{ color: C.muted, fontSize: 15 }}>{l}</Text>)}
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Btn title="Log in" variant="light" style={{ borderColor: C.field }} />
          <Btn title="Open account" />
        </View>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 56, paddingVertical: 72, paddingHorizontal: 80 }}>
        <View style={{ flexGrow: 1, flexBasis: 480, maxWidth: 640 }}>
          <Text style={{ color: C.text, fontSize: 60, lineHeight: 64, fontWeight: '800', marginBottom: 20 }}>
            Trade global markets. <Text style={{ color: C.orange }}>Fund with M-Pesa.</Text>
          </Text>
          <Text style={{ color: C.muted, fontSize: 18, lineHeight: 29, marginBottom: 32 }}>
            [YOUR VALUE PROPOSITION: one sentence on what customers can trade or save, and with which licensed partner.]
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
            <Btn title="Open live account" />
            <Btn title="Try demo account" variant="outline" />
          </View>
        </View>
        <Card style={{ flexGrow: 1, flexBasis: 380, maxWidth: 480, padding: 20 }}><Trader /></Card>
      </View>

      <View style={{ paddingHorizontal: 80, paddingBottom: 48 }}>
        <Card style={{ paddingVertical: 8, paddingHorizontal: 24 }}>
          <Row head cells={['Instrument', 'Price', 'Spread']} />
          {INSTRUMENTS.map((s) => <Row key={s} cells={[s, PRICE, '[SPREAD]']} trade />)}
        </Card>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, paddingHorizontal: 80, paddingBottom: 56 }}>
        {FEATURES.map(([t, d]) => (
          <Card key={t} style={{ flexGrow: 1, flexBasis: 260, padding: 28 }}>
            <View style={{ width: 40, height: 4, backgroundColor: C.orange, marginBottom: 18 }} />
            <Text style={{ color: C.text, fontSize: 20, fontWeight: '800', marginBottom: 8 }}>{t}</Text>
            <Text style={{ color: C.muted, lineHeight: 24 }}>{d}</Text>
          </Card>
        ))}
      </View>

      <View style={{ borderTopWidth: 1, borderTopColor: C.line, paddingVertical: 28, paddingHorizontal: 80 }}>
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 21 }}>
          [RISK WARNING AND LICENSING DETAILS: add your regulated entity name, licence number and required risk disclosure.]
        </Text>
      </View>
    </ScrollView>
  );
}

function Row({ cells, head, trade }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.line }}>
      {cells.map((c, i) => (
        <Text key={i} style={{ flex: i === 0 ? 1.2 : 1, color: head ? C.muted : i === 0 ? C.text : C.muted, fontWeight: head ? '600' : i === 0 ? '800' : '400', fontSize: head ? 13 : 15 }}>{c}</Text>
      ))}
      <View style={{ width: 90, alignItems: 'flex-end' }}>{trade && <Btn title="Trade" style={{ minHeight: 40, paddingHorizontal: 18 }} />}</View>
    </View>
  );
}