// Planning scenario, never actual spend. Unknown avatar tariff stays explicit.
import { writeFileSync, mkdirSync } from 'node:fs';
const minutes = 90;
const seconds = minutes * 60;
const dialogue = (270 * 4000 * 0.10 + 270 * 200 * 0.50) / 1e6;
const emotion = (270 * 1000 * 0.10 + 270 * 80 * 0.50) / 1e6;
const memory = (18 * 4000 * 0.10 + 18 * 400 * 0.50) / 1e6;
const analysis = (20000 * 2 + 5000 * 10) / 1e6;
const common = {
  stt_regular: minutes * 0.0077,
  tts_plan_equivalent: minutes * 0.5 * 750 * 5 / 100000,
  dialogue, emotion, memory, analysis,
  worker_active: seconds * (2 * 0.00000386 + 1 * 0.00000772),
  worker_egress_allowance: 0.01,
  fixed_reserve_per_call: 80 / 100,
};
const sum = values => Object.values(values).reduce((a, b) => a + b, 0);
const media = (participants, mbps, egressPerMinute) => {
  const gb = seconds * mbps / 8 / 1000;
  return {
    participants: minutes * participants * 0.0005,
    downstream: gb * 0.12,
    recording: minutes * egressPerMinute,
    storage_month: gb * 0.0213,
    one_uncached_replay_allowance: gb * 0.09,
  };
};
const voice = media(2, 0.128, 0.005);
const video = media(3, 2, 0.02);
const voiceTotal = sum(common) + sum(voice);
const videoBase = sum(common) + sum(video);
const scenarios = [0.01, 0.05, 0.10].map(assumedRate => ({
  assumedAvatarUsdPerMinute: assumedRate,
  rateVerified: false,
  total90MinutesWith20PercentReserve: (videoBase + minutes * assumedRate) * 1.2,
}));
const result = {
  kind: 'planning_estimate_not_invoice', currency: 'USD', checkedAt: '2026-09-24',
  assumptions: { minutes, speakingFraction: 0.5, charactersPerSpokenMinute: 750,
    turnsPerMinute: 3, monthlyCallsForFixedReserve: 100, recordingRetentionDays: 30,
    contingency: 0.2, subscriptionsPurchased: false },
  common, voice, video,
  voiceWith20PercentReserve: voiceTotal * 1.2,
  videoBaseWithoutAvatarWith20PercentReserve: videoBase * 1.2,
  maximumAvatarRateFor15Usd: (15 / 1.2 - videoBase) / minutes,
  simliScenarios: scenarios,
  tavus90MinuteSensitivity: [0.31, 0.37].map(rate => ({
    rate, totalWith20PercentReserve: (videoBase + minutes * rate) * 1.2,
    note: 'Growth minimum subscription not fully allocated here; see cost-model.md',
  })),
};
mkdirSync('docs/evidence/fase-1', { recursive: true });
writeFileSync('docs/evidence/fase-1/cost-scenarios.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
