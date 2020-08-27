export interface HonestTheme {
  spacing: (unit?: number) => number;
  palette: HonestPalette;
  typography: HonestTypography;
}

export interface HonestPalette {
  border: string;
  text: string;
  textDarker: string;
  textLighter: string;
}

export interface HonestTypography {
  fontFamily: string;
  fontSize: number;
}

export const theme: HonestTheme = {
  spacing: (unit = 1) => 4 * unit,
  palette: {
    border: '#d0d0d0',
    textDarker: '#252525',
    text: '#808080',
    textLighter: '#a0a0a0'
  },
  typography: {
    fontFamily: 'Verdana,Helvetica,sans-serif,serif',
    fontSize: 16
  }
};