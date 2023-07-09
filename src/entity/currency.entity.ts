import Decimal from 'decimal.js';

export class CurrencyEntity {
  name: string;
  pluaralName: string;
  amount: Decimal;
  count: number;

  constructor(
    name: string,
    pluaralName: string,
    amount: Decimal,
    count: number,
  ) {
    this.name = name;
    this.pluaralName = pluaralName;
    this.amount = amount;
    this.count = count;
  }

  toString(): string {
    if (this.count === 1) return this.count + ' ' + this.name;
    else return this.count + ' ' + this.pluaralName;
  }
}
