import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { C } from '../theme';
import { Btn, Card } from '../components/ui';
import { AuthForm } from '../components/Forms';

export default function ProfileScreen({ user, login, logout }) {
  const [mode, setMode] = useState('login');
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ color: C.text, fontSize: 22, fontWeight: '800', marginBottom: 14 }}>{user ? 'Profile' : mode === 'signup' ? 'Create account' : 'Log in'}</Text>
      {user ? (
        <>
          <Card style={{ marginBottom: 16 }}>
            <Text style={{ color: C.muted, marginBottom: 4 }}>Signed in as</Text>
            <Text style={{ color: C.text, fontSize: 16, fontWeight: '600' }}>{user.email}</Text>
          </Card>
          <Btn title="Log out" variant="outline" onPress={logout} />
        </>
      ) : (
        <AuthForm mode={mode} onAuth={login} onSwitch={() => setMode(mode === 'login' ? 'signup' : 'login')} />
      )}
    </ScrollView>
  );
}
