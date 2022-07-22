/* eslint-disable no-console */
import { numberToChinese, calcDiffTime } from './utils.js';

// Print author info to the console
console.info(`%cTrialHammer HomePage\nBuilt with ❤️ by CSZongzi`, 'font-weight: bold');

// Calc TrialHammer Time
const birthday = new Date(2016, 8, 4);
const now = new Date();
const diffTime = calcDiffTime(now, birthday);

// Print TrialHammer Time to the console
console.info(
  `%c当前是锤历${numberToChinese(diffTime.year)}年${numberToChinese(
    diffTime.month,
  )}月${numberToChinese(diffTime.day)}日`,
  'font-weight: bold',
);

// Click the navTitleEl will navigate to homepage
const navTitleEl = document.querySelector('.page-header-content .title') as HTMLHeadingElement;
navTitleEl.onclick = () => {
  window.location.href = '/';
};
