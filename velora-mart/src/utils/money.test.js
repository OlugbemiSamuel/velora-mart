import {it, expect, describe} from 'vitest';
import { formatMoney } from './Money';

describe('formatMoney', () => {
     
it('formats 2020 cents to $20.20', () => {
    expect(formatMoney(2020)).toBe('$20.20');
});

it('checks for two decimals', () => {
    expect(formatMoney(1000)).toBe('$10.00');
    expect(formatMoney(0)).toBe('$0.00')
})


})


