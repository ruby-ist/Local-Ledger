import { defineConfig } from 'unocss';

type Direction = 't' | 'r' | 'b' | 'l';

const sides: Record<Direction, string> = { t: 'top', l: 'left', b: 'bottom', r: 'right' };

const validUnits = ['px', 'p', 'vh', 'vw', 'rem', 'em'];

// Move this mapping to constants if you prefer
const styleMapping: Record<string, string> = {
  m: 'margin',
  p: 'padding',
  t: 'top',
  l: 'left',
  b: 'bottom',
  r: 'right',
};

// Helper function to map units
const mapUnit = (unit?: string): string => {
  if (!unit) {
    return 'px'; // Default unit
  }
  if (validUnits.includes(unit)) {
    return unit === 'p' ? '%' : unit;
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
    [/^(m|p)(t|r|b|l)-(\d+)(\w{1,3})?$/,
      ([, style, direction, value, unit]) => {
        const fullProperty = `${mapStyle(style)}-${sides[direction as Direction]}`;
        const mappedUnit = mapUnit(unit);
        return { [fullProperty]: `${value}${mappedUnit}` };
      }],

    // Combined margin & padding rule
    [/^(m|p)-(\d+)(\w{1,3})?(?:-(\d+)(\w{1,3})?)?(?:-(\d+)(\w{1,3})?)?(?:-(\d+)(\w{1,3})?)?$/,
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
    [/^(h|w)-(\d+)(\w{1,3})?/, ([, style, i, unit]) => {
      const property = style === 'h' ? 'height' : 'width';
      return {
        [property]: `${i}${mapUnit(unit)}`,
      };
    }],

    // Flexbox shorthand rules
    ['flex', { display: 'flex' }],
    [/^align-([a-z-]+)$/, ([, alignment]) => ({ 'align-items': alignment })],
    [/^align--([a-z-]+)$/, ([, alignment]) => ({ 'align-content': alignment })],
    [/^justify-([a-z-]+)$/, ([, alignment]) => ({ 'justify-items': alignment })],
    [/^justify--([a-z-]+)$/, ([, alignment]) => ({ 'justify-content': alignment })],
    [/^(row|column)$/, ([, direction]) => ({ 'flex-direction': direction })],
    [/^(wrap|nowrap)$/, ([, wrap]) => ({ 'flex-wrap': wrap })],

    // display rules
    ['inline-block', { display: 'inline-block' }],

    // Center Grid shorthand rule
    [/^centered-grid$/, () => ({
      'display': 'grid',
      'place-items': 'center',
    })],

    // position rules
    [/^(relative|absolute|fixed)$/, ([, i]) => ({ position: i })],
    [/^(-)?(t|r|b|l)-(\d+)(\w{1,3})?$/,
      ([, negative, style, value, unit]) => {
        const fullProperty = mapStyle(style);
        const mappedUnit = mapUnit(unit);
        if (negative) {
          return { [fullProperty]: `-${value}${mappedUnit}` };
        } else {
          return { [fullProperty]: `${value}${mappedUnit}` };
        }
      }],

    // Z index rule
    [/^(-)?z-(\d+)$/, ([, negative, index]) => {
      if (negative) {
        return { 'z-index': `-${index}` };
      } else {
        return { 'z-index': index };
      }
    }],

    // Cursor rules
    ['pointer', { cursor: 'pointer' }],

    // Textarea resize
    ['no-resize', { resize: 'none' }],

    // overflow rules
    [/^(clip|hidden|visible|scroll|auto)-overflow(?:--(x|y))?$/, ([, value, axis]) => {
      if (axis) {
        return { [`overflow-${axis}`]: value };
      } else {
        return { overflow: value };
      }
    }],

    // no scroll bar rule
    [/^no-scroll-bar$/,
      () => {
        return [
          {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          },
          `.no-scroll-bar::-webkit-scrollbar {display: none;}`,
        ];
      },
    ],
  ],
});
