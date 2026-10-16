import React from 'react';
import { Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { C } from '../theme';

export function Btn({ title, onPress, variant = 'primary', style }) {
  const v = styles[variant];
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[styles.btn, v.box, style]}>
      <Text style={[styles.btnText, v.text]}>{title}</Text>
    </Pressable>
  );
}

export function Field({ label, ...props }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor={C.muted} style={styles.input} {...props} />
    </View>
  );
}

export function Chip({ title, active, onPress }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}
      style={[styles.chip, active && { backgroundColor: C.orange, borderColor: C.orange }]}>
      <Text style={{ color: active ? C.onOrange : C.muted, fontWeight: '700', fontSize: 13 }}>{title}</Text>
    </Pressable>
  );
}

export const Card = ({ children, style }) => <View style={[styles.card, style]}>{children}</View>;

const styles = StyleSheet.create({
  btn: { minHeight: 48, paddingHorizontal: 22, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontWeight: '800', fontSize: 16 },
  primary: { box: { backgroundColor: C.orange }, text: { color: C.onOrange } },
  outline: { box: { borderWidth: 2, borderColor: C.orange }, text: { color: C.orange } },
  light: { box: { borderWidth: 2, borderColor: C.text }, text: { color: C.text } },
  dark: { box: { backgroundColor: C.bg }, text: { color: C.orange } },
  label: { color: C.muted, fontSize: 13, marginBottom: 6 },
  input: { minHeight: 52, backgroundColor: C.card, color: C.text, borderWidth: 1, borderColor: C.field, borderRadius: 8, paddingHorizontal: 14, fontSize: 16 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6, borderWidth: 1, borderColor: C.line },
  card: { backgroundColor: C.card, borderWidth: 1, borderColor: C.line, borderRadius: 12, padding: 16 },
});