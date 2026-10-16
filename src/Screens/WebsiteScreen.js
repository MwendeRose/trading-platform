import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { C, BRAND } from '../theme';
import { PAIRS, fmtPrice } from '../market';
import { Btn, Card } from '../components/ui';
import Terminal from '../components/Terminal';
import MarketWatch from '../components/MarketWatch';
import { DepositForm, WithdrawForm, AuthForm } from '../components/Forms';

const NAV = [['markets', 'Markets'], ['platforms', 'Platforms'], ['deposits', 'Deposits'], ['learn', 'Learn']];
const FEATURES = [
  ['Instant deposits', 'Pay from your M-Pesa and see funds in your wallet once confirmed.'],
  ['Practice first', 'Learn on a demo account with virtual money before risking your own.'],
  ['Verified and secure', 'Identity checks and a full record of every transaction on your account.'],
];
const PAD = 80;

export default function WebsiteScreen({ platform, balance, deposit, withdraw, user, login, logout }) {
  const [page, setPage] = useState('home');
  const go = (p, s) => { if (s) platform.setSymbol(s); setPage(p); };

  return (
    <ScrollView style={{ backgroundColor: C.bg }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingVertical: 14, paddingHorizontal: PAD, borderBottomWidth: 1, borderBottomColor: C.line }}>
        <Pressable accessibilityRole="button" onPress={() => go('home')} style={{ minHeight: 44, justifyContent: 'center' }}>
          <Text style={{ color: C.orange, fontSize: 22, fontWeight: '800' }}>{BRAND}</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {NAV.map(([id, label]) => (
            <Pressable key={id} accessibilityRole="button" onPress={() => go(id)} style={{ minHeight: 44, paddingHorizontal: 8, justifyContent: 'center' }}>
              <Text style={{ color: page === id ? C.orange : C.muted, fontSize: 15, fontWeight: page === id ? '800' : '400' }}>{label}</Text>
            </Pressable>
          ))}
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {user ? (
            <>
              <Btn title="Deposit" variant="outline" onPress={() => go('deposits')} />
              <Btn title="Withdraw" variant="outline" onPress={() => go('withdraw')} />
              <Btn title="Log out" variant="light" style={{ borderColor: C.field }} onPress={() => { logout(); go('home'); }} />
            </>
          ) : (
            <>
              <Btn title="Log in" variant="light" style={{ borderColor: C.field }} onPress={() => go('login')} />
              <Btn title="Open account" onPress={() => go('signup')} />
            </>
          )}
        </View>
      </View>

      {page === 'home' && <Home go={go} platform={platform} />}
      {page === 'markets' && (
        <Section title="Markets" text="Pick an instrument to open the trading panel.">
          <MarketTable go={go} platform={platform} />
        </Section>
      )}
      {(page === 'trade' || page === 'demo') && (
        <Section title={page === 'demo' ? 'Demo account' : 'Trade'} text="Prices are simulated. Deposit demo money, then place orders.">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
            <Card style={{ flexGrow: 1, flexBasis: 300, maxWidth: 380, padding: 8 }}><MarketWatch platform={platform} /></Card>
            <Card style={{ flexGrow: 2, flexBasis: 520, padding: 20 }}><Terminal platform={platform} /></Card>
          </View>
        </Section>
      )}
      {page === 'platforms' && (
        <Section title="Platforms" text="Trade from your browser or your phone.">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
            <Info t="Web platform" d="Open the trading panel in your browser." b="Open web trading" onPress={() => go('trade')} />
            <Info t="Mobile app" d="[ADD YOUR APP STORE AND PLAY STORE LINKS HERE]" b="Try the demo" onPress={() => go('demo')} />
          </View>
        </Section>
      )}
      {page === 'deposits' && (
        <Section title="Deposit" text={`Available balance: KES ${balance.toLocaleString()}`}>
          <View style={{ maxWidth: 520 }}><DepositForm deposit={deposit} /></View>
        </Section>
      )}
      {page === 'withdraw' && (
        <Section title="Withdraw" text={`Available balance: KES ${balance.toLocaleString()}`}>
          <View style={{ maxWidth: 520 }}><WithdrawForm balance={balance} withdraw={withdraw} /></View>
        </Section>
      )}
      {page === 'learn' && (
        <Section title="Learn" text="Start with the basics before you trade.">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
            <Info t="What is trading?" d="[ADD YOUR EDUCATION CONTENT HERE]" b="Try the demo" onPress={() => go('demo')} />
            <Info t="Managing risk" d="[ADD YOUR EDUCATION CONTENT HERE]" b="Try the demo" onPress={() => go('demo')} />
          </View>
        </Section>
      )}
      {(page === 'login' || page === 'signup') && (
        <Section title={page === 'signup' ? 'Create account' : 'Log in'}>
          <View style={{ maxWidth: 420 }}>
            <AuthForm mode={page} onAuth={(email) => { login(email); go('trade'); }} onSwitch={() => go(page === 'login' ? 'signup' : 'login')} />
          </View>
        </Section>
      )}

      <View style={{ borderTopWidth: 1, borderTopColor: C.line, paddingVertical: 28, paddingHorizontal: PAD }}>
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 21 }}>
          [RISK WARNING AND LICENSING DETAILS: add your regulated entity name, licence number and required risk disclosure.]
        </Text>
      </View>
    </ScrollView>
  );
}

function Home({ go, platform }) {
  return (
    <View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 56, paddingVertical: 72, paddingHorizontal: PAD }}>
        <View style={{ flexGrow: 1, flexBasis: 480, maxWidth: 640 }}>
          <Text style={{ color: C.text, fontSize: 60, lineHeight: 64, fontWeight: '800', marginBottom: 20 }}>
            Trade global markets. <Text style={{ color: C.orange }}>Fund with M-Pesa.</Text>
          </Text>
          <Text style={{ color: C.muted, fontSize: 18, lineHeight: 29, marginBottom: 32 }}>
            [YOUR VALUE PROPOSITION: one sentence on what customers can trade or save, and with which licensed partner.]
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
            <Btn title="Open live account" onPress={() => go('signup')} />
            <Btn title="Try demo account" variant="outline" onPress={() => go('demo')} />
          </View>
        </View>
        <Card style={{ flexGrow: 1, flexBasis: 380, maxWidth: 480, padding: 20 }}><Terminal platform={platform} compact onOpened={() => go('trade')} /></Card>
      </View>
      <View style={{ paddingHorizontal: PAD, paddingBottom: 48 }}><MarketTable go={go} platform={platform} /></View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, paddingHorizontal: PAD, paddingBottom: 56 }}>
        {FEATURES.map(([t, d]) => (
          <Card key={t} style={{ flexGrow: 1, flexBasis: 260, padding: 28 }}>
            <View style={{ width: 40, height: 4, backgroundColor: C.orange, marginBottom: 18 }} />
            <Text style={{ color: C.text, fontSize: 20, fontWeight: '800', marginBottom: 8 }}>{t}</Text>
            <Text style={{ color: C.muted, lineHeight: 24 }}>{d}</Text>
          </Card>
        ))}
      </View>
    </View>
  );
}

function Section({ title, text, children }) {
  return (
    <View style={{ paddingVertical: 56, paddingHorizontal: PAD, minHeight: 460 }}>
      <Text style={{ color: C.text, fontSize: 36, fontWeight: '800', marginBottom: 8 }}>{title}</Text>
      {!!text && <Text style={{ color: C.muted, fontSize: 16, marginBottom: 28 }}>{text}</Text>}
      {children}
    </View>
  );
}

function Info({ t, d, b, onPress }) {
  return (
    <Card style={{ flexGrow: 1, flexBasis: 280, maxWidth: 420, padding: 28 }}>
      <Text style={{ color: C.text, fontSize: 20, fontWeight: '800', marginBottom: 8 }}>{t}</Text>
      <Text style={{ color: C.muted, lineHeight: 24, marginBottom: 20 }}>{d}</Text>
      <Btn title={b} onPress={onPress} />
    </Card>
  );
}

function MarketTable({ go, platform }) {
  return (
    <Card style={{ paddingVertical: 8, paddingHorizontal: 24 }}>
      <Row head cells={['Pair', 'Bid', 'Ask', 'Spread']} />
      {PAIRS.map((d) => {
        const p = platform.prices[d.symbol];
        return <Row key={d.symbol} dir={p.dir} cells={[d.symbol, fmtPrice(d.symbol, p.bid), fmtPrice(d.symbol, p.ask), `${d.spread.toFixed(1)} pips`]} onTrade={() => go('trade', d.symbol)} />;
      })}
    </Card>
  );
}

function Row({ cells, head, onTrade, dir }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.line }}>
      {cells.map((c, i) => (
        <Text key={i} style={{ flex: i === 0 ? 1.2 : 1, color: head ? C.muted : i === 0 ? C.text : i < 3 ? (dir > 0 ? C.up : dir < 0 ? C.down : C.text) : C.muted, fontWeight: head ? '600' : i === 0 ? '800' : '400', fontSize: head ? 13 : 15 }}>{c}</Text>
      ))}
      <View style={{ width: 90, alignItems: 'flex-end' }}>{onTrade && <Btn title="Trade" style={{ minHeight: 40, paddingHorizontal: 18 }} onPress={onTrade} />}</View>
    </View>
  );
}
