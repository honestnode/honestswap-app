export interface NumberFormatOptions {
  decimals?: number;
  thousandsSeparate?: boolean;
  percentage?: boolean;
}

export class Numbers {

  public static format(input: number, options: NumberFormatOptions = {}): string {
    const {decimals = 2, thousandsSeparate = true, percentage = false} = options;
    let result = percentage ? (input * 100).toFixed(decimals) + '%' : input.toFixed(decimals);
    return thousandsSeparate ? result.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : result;
  }
}