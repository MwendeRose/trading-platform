import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { C } from '../theme';
import { Btn, Chip, Field, Card } from './ui';

const toInt = (t) => parseInt(String(t).replace(/[^0-9]/g, ''), 10);

export function DepositForm({ deposit }) {
  const [method, setMethod] = useState('M-Pesa');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = () => {
    const v = toInt(amount);
    if (method === 'Card') return setStatus('Card deposits are not set up yet. Use M-Pesa.');
    if (!phone.trim()) return setStatus('Enter your M-Pesa phone number');
    if (!v) return setStatus('Enter an amount');
    if (v < 50) return setStatus('Minimum deposit is KES 50');
    if (busy) return;
    setBusy(true);
    setStatus(`Check your phone and enter your M-Pesa PIN to approve KES ${v.toLocaleString()}.`);
    // Real version: your server calls the Daraja STK Push API and credits the balance after Safaricom confirms.
    setTimeout(() => {
      deposit(v);
      setStatus('Deposit received.');
      setAmount('');
      setBusy(false);
    }, 1800);
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
        {['M-Pesa', 'Card'].map((m) => <Chip key={m} title={m} active={m === method} onPress={() => { setMethod(m); setStatus(''); }} />)}
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
    </View>
  );
}

export function WithdrawForm({ balance, withdraw }) {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const submit = () => {
    const v = toInt(amount);
    if (!phone.trim()) return setStatus('Enter the M-Pesa number that will receive the money');
    if (!v) return setStatus('Enter an amount');
    if (v < 50) return setStatus('Minimum withdrawal is KES 50');
    if (v > balance) return setStatus('That is more than your available balance');
    withdraw(v);
    setAmount('');
    setStatus(`Withdrawal of KES ${v.toLocaleString()} requested. It will be sent to ${phone.trim()}.`);
  };

  return (
    <View>
      <Field label="M-Pesa phone number" placeholder="0712 345 678" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Field label="Amount (KES)" placeholder="1,000" value={amount} onChangeText={(t) => { setAmount(t); setStatus(''); }} keyboardType="number-pad" />
      <Btn title="Max" variant="light" style={{ minHeight: 44, marginBottom: 16 }} onPress={() => setAmount(String(balance))} />
      {!!status && <Text style={{ color: C.orange, marginBottom: 12 }}>{status}</Text>}
      <Btn title="Withdraw to M-Pesa" onPress={submit} />
    </View>
  );
}

export function AuthForm({ mode, onAuth, onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const signup = mode === 'signup';

  const submit = () => {
    if (!email.includes('@') || !email.includes('.')) return setError('Enter a valid email address');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    // Demo only: a real app sends these to your server and verifies identity (KYC).
    onAuth(email.trim());
  };

  return (
    <View>
      <Field label="Email" placeholder="name@email.com" value={email} onChangeText={(t) => { setEmail(t); setError(''); }} keyboardType="email-address" autoCapitalize="none" />
      <Field label="Password" placeholder="At least 6 characters" value={password} onChangeText={(t) => { setPassword(t); setError(''); }} secureTextEntry />
      {!!error && <Text style={{ color: C.orange, marginBottom: 12 }}>{error}</Text>}
      <Btn title={signup ? 'Create account' : 'Log in'} onPress={submit} style={{ marginBottom: 12 }} />
      <Btn title={signup ? 'I already have an account' : 'Create an account'} variant="outline" onPress={onSwitch} />
    </View>
  );
}
