import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { C } from '../theme';
import { Btn, Chip, Field, Card } from '../components/ui';

export default function DepositScreen({ deposit }) {
  const [method, setMethod] = useState('M-Pesa');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = () => {
    const v = parseInt(amount.replace(/[^0-9]/g, ''), 10);
    if (!phone.trim()) return setStatus('Enter your M-Pesa phone number');
    if (!v) return setStatus('Enter an amount');
    if (v < 50) return setStatus('Minimum deposit is KES 50');
    if (busy) return;
    setBusy(true);
    setStatus(`Check your phone and enter your M-Pesa PIN to approve KES ${v.toLocaleString()}.`);
    setTimeout(() => {
      deposit(v);
      setStatus('Deposit received.');
      setAmount('');
      setBusy(false);
    }, 1800);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ color: C.text, fontSize: 22, fontWeight: '800', marginBottom: 14 }}>Deposit</Text>
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
        {['M-Pesa', 'Card'].map((m) => <Chip key={m} title={m} active={m === method} onPress={() => setMethod(m)} />)}
      </View>
      <Field label="M-Pesa phone number" placeholder="0712 345 678" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Field label="Amount (KES)" placeholder="1,000" value={amount} onChangeText={(t) => { setAmount(t); setStatus(''); }} keyboardType="number-pad" />
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
        {['500', '1000', '5000'].map((q) => <Btn key={q} title={Number(q).toLocaleString()} variant="light" style={{ flex: 1, minHeight: 44 }} onPress={() => setAmount(q)} />)}
      </View>
      <Card style={{ marginBottom: 16 }}>
        <Text style={{ color: C.muted, lineHeight: 22 }}>After you tap Deposit, a PIN prompt appears on your phone. Your balance updates once M-Pesa confirms.</Text>
      </Card>
      {!!status && <Text style={{ color: C.orange, marginBottom: 12 }}>{status}</Text>}
      <Btn title="Deposit with M-Pesa" onPress={submit} />
    </ScrollView>
  );
}