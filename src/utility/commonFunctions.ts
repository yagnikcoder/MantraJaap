export const formatCount = (count: number): string => {
  // Indian numbering format
  // 10,000 – 99,999 -> 10k, 11k, ...
  if (count >= 10000 && count < 100000) {
    const thousands = Math.floor(count / 1000);
    return `${thousands}k`;
  }
  // 1,00,000 – 99,99,999 -> 1L, 10L, 99L, ...
  if (count >= 100000 && count < 10000000) {
    const lakhs = Math.floor(count / 100000);
    return `${lakhs}L`;
  }
  // 1,00,00,000 and above -> 1Cr, 2Cr, ...
  if (count >= 10000000) {
    const crores = Math.floor(count / 10000000);
    return `${crores}Cr`;
  }
  return count.toString();
};

export const getDynamicFontSize = (count: number): number => {
  // Adjust font size based on the length of the RAW count (not formatted)
  const len = count.toString().length;
  switch (len) {
    case 3:
      return 180;
    case 4:
      return 160;
    case 5:
      return 140;
    default:
      // Fallback to the base size used in styles
      return 140;
  }
};

export const formatExactIndian = (count: number): string => {
  // Format exact number with Indian-style commas (e.g., 10,00,005)
  const isNegative = count < 0;
  const nStr = Math.abs(count).toString();
  if (nStr.length <= 3) return (isNegative ? '-' : '') + nStr;
  const last3 = nStr.slice(-3);
  let rest = nStr.slice(0, -3);
  // Insert commas every 2 digits in the remaining part
  const parts: string[] = [];
  while (rest.length > 2) {
    parts.unshift(rest.slice(-2));
    rest = rest.slice(0, -2);
  }
  if (rest.length) parts.unshift(rest);
  const head = parts.join(',');
  return (isNegative ? '-' : '') + head + ',' + last3;
};
