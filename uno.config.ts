import { defineConfig } from 'unocss';

type Direction = 't' | 'r' | 'b' | 'l';

const sides: Record<Direction, string> = { t: 'top', l: 'left', b: 'bottom', r: 'right' };

const validUnits = ['px', 'per', 'vh', 'vw', 'rem', 'em'];

// Move this mapping to constants if you prefer
const styleMapping: Record<string, string> = {
  m: 'margin',
  p: 'padding',
};

// Helper function to map units
const mapUnit = (unit?: string): string => {
  if (!unit) {
    return 'px'; // Default unit
  }
  if (validUnits.includes(unit)) {
    return unit === 'per' ? '%' : unit;
  }
  throw new Error(`Invalid unit: ${unit}`);
};

// Helper function to map style shorthand to full property name
const mapStyle = (style: string): string => {
  const fullProperty = styleMapping[style];
  if (!fullProperty) {
    throw new Error(`Unsupported style shorthand: ${style}`);
  }
  return fullProperty;
};

export default defineConfig({
  rules: [
    [/^fw-(\d{3})$/, ([, weight]) => ({ 'font-weight': weight })],

    // Direction-based padding & margin rule
    [/^(m|p)(t|r|b|l)-(\d+)(\w{2,3})?$/,
      ([, style, direction, value, unit]) => {
        const fullProperty = `${mapStyle(style)}-${sides[direction as Direction]}`;
        const mappedUnit = mapUnit(unit);
        return { [fullProperty]: `${value}${mappedUnit}` };
      }],

    // Combined margin & padding rule
    [/^(m|p)-(\d+)(\w{2,3})?(?:-(\d+)(\w{2,3})?)?(?:-(\d+)(\w{2,3})?)?(?:-(\d+)(\w{2,3})?)?$/,
      ([, style, v1, u1, v2, u2, v3, u3, v4, u4]) => {
        const property = mapStyle(style);
        return {
          [property]: [
            `${v1}${mapUnit(u1)}`,
            v2 ? `${v2}${mapUnit(u2)}` : '',
            v3 ? `${v3}${mapUnit(u3)}` : '',
            v4 ? `${v4}${mapUnit(u4)}` : '',
          ].filter(Boolean).join(' '),
        };
      }],

    // height and weight shorthand rule
    [/^(h|w)-(\d+)(\w{2,3})?/, ([, style, i, unit]) => {
      const property = style === 'h' ? 'height' : 'width';
      return {
        [property]: `${i}${mapUnit(unit)}`,
      };
    }],
  ],
});
