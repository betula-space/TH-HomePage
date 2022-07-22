// Simplified Chinese number characters and units
// Note that '〇' and '零' are actually different representations of the same character
const chnNumChar = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
const chnUnitChar = ['', '十', '百', '千'];

// Subfunction for converting some Arabic numerals to Chinese numerals
const sectionToChinese = (section: number) => {
  let strIns = '';
  let chnStr = '';
  let unitPos = 0;
  let zero = true;
  while (section > 0) {
    const v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    // eslint-disable-next-line no-param-reassign
    section = Math.floor(section / 10);
  }
  // According to the national standard, the '一' in '一十' is not written
  return chnStr.replace('一十', '十');
};

// Convert a number to Chinese numerals
export const numberToChinese = (num: number): string => {
  let unitPos = 0;
  let strIns = '';
  let chnStr = '';
  let needZero = false;

  if (num === 0) {
    return chnNumChar[0];
  }

  while (num > 0) {
    const section = num % 10000;
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = sectionToChinese(section);
    strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = section < 1000 && section > 0;
    // eslint-disable-next-line no-param-reassign
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr;
};

// Calculate the difference (year, month, day, etc.) between two times
export const calcDiffTime = (endTime: Date, startTime: Date) => {
  let diff = (endTime.valueOf() - startTime.valueOf()) / 1000;
  const year = Math.floor(diff / 86400 / 365);
  diff %= 86400 * 365;
  const month = Math.floor(diff / 86400 / 30);
  diff %= 86400 * 30;
  const day = Math.floor(diff / 86400);
  diff %= 86400;
  const hour = Math.floor(diff / 3600);
  diff %= 3600;
  const minute = Math.floor(diff / 60);
  diff %= 60;
  const second = diff;
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
  };
};
