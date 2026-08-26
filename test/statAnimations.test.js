import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const homeStatsSource = readFileSync(
  new URL('../src/pages/Home/StatsSection.jsx', import.meta.url),
  'utf8'
);
const profileStatsSource = readFileSync(
  new URL('../src/pages/About/ProfileSection.jsx', import.meta.url),
  'utf8'
);

test('home stat values use scramble wrappers around CountUp', () => {
  assert.match(
    homeStatsSource,
    /<ScrambleOnHover[\s\S]*?<CountUp value=\{stat\.value\} \/>[\s\S]*?<\/ScrambleOnHover>/
  );
});

test('profile stat values use scramble wrappers around CountUp', () => {
  const profileStatsMarkup = profileStatsSource.slice(
    profileStatsSource.indexOf('{profileStats.map')
  );

  assert.match(
    profileStatsMarkup,
    /<ScrambleOnHover[\s\S]*?<CountUp value=\{stat\.value\} \/>[\s\S]*?<\/ScrambleOnHover>/
  );
});
