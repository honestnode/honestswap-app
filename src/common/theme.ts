export interface HonestTheme {
  spacing: (unit?: number) => number;
  palette: HonestPalette;
  typography: HonestTypography;
}

export interface HonestPalette {
  border: string;
  background: string;
  buttonPrimary: string;
  buttonPrimaryDarker: string;
  text: string;
  textDarker: string;
  textLighter: string;
  textWhite: string;
  token: (name: string) => string;
}

export interface HonestTypography {
  fontFamily: string;
  fontSize: number;
}

export const theme: HonestTheme = {
  spacing: (unit = 1) => 8 * unit,
  palette: {
    border: '#d0d0d0',
    background: '#f0f0f0',
    buttonPrimary: '#66cbff',
    buttonPrimaryDarker: '#0099ff',
    textDarker: '#404040',
    text: '#909090',
    textLighter: '#a0a0a0',
    textWhite: '#f0f0f0',
    token: name => {
      const themed: Record<string, string> = {
        husd: '#f0f0f0',
        dai: '#f4b731',
        usdc: '#2775C9',
        usdt: '#26A17B',
        tusd: '#2B2E7F'
      };
      return themed[name] || '#' + ((1 << 24) * Math.random() | 0).toString(16);
    }
  },
  typography: {
    fontFamily: 'Verdana,Helvetica,sans-serif,serif',
    fontSize: 16
  }
};