// Simulated market engine. Prices here are random-walk demo prices, not real quotes.
// To go live, replace tick() with prices from your licensed broker or liquidity provider.

export const LEVERAGE = 100;

export const PAIRS = [
  { symbol: 'EUR/USD', base: 1.085, digits: 5, pip: 0.0001, spread: 0.8, contract: 100000 },
  { symbol: 'GBP/USD', base: 1.27, digits: 5, pip: 0.0001, spread: 1.2, contract: 100000 },
  { symbol: 'USD/JPY', base: 150.2, digits: 3, pip: 0.01, spread: 1.0, contract: 100000 },
  { symbol: 'AUD/USD', base: 0.66, digits: 5, pip: 0.0001, spread: 1.0, contract: 100000 },
  { symbol: 'USD/CHF', base: 0.89, digits: 5, pip: 0.0001, spread: 1.3, contract: 100000 },
  { symbol: 'USD/CAD', base: 1.36, digits: 5, pip: 0.0001, spread: 1.4, contract: 100000 },
  { symbol: 'XAU/USD', base: 2350, digits: 2, pip: 0.1, spread: 3, contract: 100 },
  { symbol: 'USD/KES', base: 129, digits: 2, pip: 0.01, spread: 20, contract: 100000 },
];

const DEF = Object.fromEntries(PAIRS.map((p) => [p.symbol, p]));
export const def = (s) => DEF[s];
const round = (v, d) => Number(v.toFixed(d));

function quote(d, mid) {
  const half = (d.spread * d.pip) / 2;
  return { mid: round(mid, d.digits), bid: round(mid - half, d.digits), ask: round(mid + half, d.digits) };
}

export function initialPrices() {
  const o = {};
  PAIRS.forEach((d) => { o[d.symbol] = { ...quote(d, d.base), dir: 0 }; });
  return o;
}

export function tick(prev, rnd = Math.random) {
  const o = {};
  PAIRS.forEach((d) => {
    const p = prev[d.symbol];
    const vol = d.pip * 2;
    const mid = p.mid + (rnd() - 0.5) * 2 * vol + (d.base - p.mid) * 0.002;
    const q = quote(d, mid);
    o[d.symbol] = { ...q, dir: q.mid > p.mid ? 1 : q.mid < p.mid ? -1 : p.dir };
  });
  return o;
}

export function seedMarket(points = 60) {
  let prices = initialPrices();
  const series = {};
  PAIRS.forEach((d) => { series[d.symbol] = [prices[d.symbol].mid]; });
  for (let i = 1; i < points; i++) {
    prices = tick(prices);
    PAIRS.forEach((d) => series[d.symbol].push(prices[d.symbol].mid));
  }
  return { prices, series };
}

export const kesRate = (prices) => prices['USD/KES'].mid;

export function marginKES(symbol, lots, mid, rate) {
  const d = def(symbol);
  const units = lots * d.contract;
  const notionalUsd = symbol.startsWith('USD/') ? units : units * mid;
  return (notionalUsd / LEVERAGE) * rate;
}

export function pnlKES(pos, p, rate) {
  const d = def(pos.symbol);
  const exit = pos.side === 'Buy' ? p.bid : p.ask;
  const diff = pos.side === 'Buy' ? exit - pos.entry : pos.entry - exit;
  const raw = diff * pos.lots * d.contract;
  const usd = pos.symbol.endsWith('/USD') ? raw : raw / p.mid;
  return usd * rate;
}

export function summarize(balance, positions, prices) {
  const rate = kesRate(prices);
  let floating = 0;
  let used = 0;
  const pnl = {};
  positions.forEach((po) => {
    const v = pnlKES(po, prices[po.symbol], rate);
    pnl[po.id] = v;
    floating += v;
    used += po.margin;
  });
  const equity = balance + floating;
  return { balance, floating, used, equity, free: equity - used, pnl };
}

export const fmtPrice = (symbol, v) => v.toFixed(def(symbol).digits);

export function kes(n, d = 0) {
  const s = Math.abs(n).toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${n < 0 && Number(s.replace(/,/g, '')) !== 0 ? '-' : ''}KES ${s}`;
}
