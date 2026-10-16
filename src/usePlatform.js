import { useEffect, useMemo, useRef, useState } from 'react';
import { seedMarket, tick, summarize, pnlKES, marginKES, kesRate, def, fmtPrice, kes } from './market';

const MAX_POINTS = 60;

export default function usePlatform({ balance, setBalance, addLog }) {
  const seed = useRef(null);
  if (!seed.current) seed.current = seedMarket(MAX_POINTS);
  const pricesRef = useRef(seed.current.prices);
  const [prices, setPrices] = useState(seed.current.prices);
  const [series, setSeries] = useState(seed.current.series);
  const [positions, setPositions] = useState([]);
  const [history, setHistory] = useState([]);
  const [symbol, setSymbol] = useState('EUR/USD');

  useEffect(() => {
    const id = setInterval(() => {
      const next = tick(pricesRef.current);
      pricesRef.current = next;
      setPrices(next);
      setSeries((s) => {
        const o = {};
        Object.keys(s).forEach((k) => { o[k] = [...s[k].slice(-(MAX_POINTS - 1)), next[k].mid]; });
        return o;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const account = useMemo(() => summarize(balance, positions, prices), [balance, positions, prices]);

  const openOrder = (side, lots) => {
    if (!(lots >= 0.01)) return { ok: false, error: 'Minimum volume is 0.01 lot' };
    if (lots > 100) return { ok: false, error: 'Maximum volume is 100 lots' };
    const p = prices[symbol];
    const margin = marginKES(symbol, lots, p.mid, kesRate(prices));
    if (margin > account.free) {
      return { ok: false, error: `Not enough free margin. You need ${kes(margin)} and have ${kes(Math.max(account.free, 0))}. Deposit first.` };
    }
    const entry = side === 'Buy' ? p.ask : p.bid;
    const pos = { id: String(Date.now()) + Math.random().toString(36).slice(2, 6), symbol, side, lots, entry, margin, time: new Date().toLocaleTimeString() };
    setPositions((l) => [pos, ...l]);
    const msg = `${side} ${lots} lot ${symbol} at ${fmtPrice(symbol, entry)}`;
    addLog(`Opened: ${msg}`);
    return { ok: true, msg: `Order filled: ${msg}` };
  };

  const closePosition = (id) => {
    const pos = positions.find((x) => x.id === id);
    if (!pos) return;
    const p = prices[pos.symbol];
    const pnl = Math.round(pnlKES(pos, p, kesRate(prices)) * 100) / 100;
    const exit = pos.side === 'Buy' ? p.bid : p.ask;
    setBalance((b) => b + pnl);
    setPositions((l) => l.filter((x) => x.id !== id));
    setHistory((h) => [{ ...pos, exit, pnl, closed: new Date().toLocaleTimeString() }, ...h].slice(0, 20));
    addLog(`Closed ${pos.side} ${pos.lots} ${pos.symbol}: ${pnl >= 0 ? '+' : ''}${kes(pnl, 2)}`);
  };

  return { symbol, setSymbol, prices, series, positions, history, account, openOrder, closePosition, def };
}
