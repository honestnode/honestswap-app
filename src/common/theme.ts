export interface HonestTheme {
  spacing: (unit?: number) => number
}

export const theme: HonestTheme = {
  spacing: (unit = 1) => 4 * unit
};