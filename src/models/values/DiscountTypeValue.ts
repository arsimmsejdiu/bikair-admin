import {DISCOUNT_CODE, DiscountType } from "@bikairproject/shared";

export const DiscountTypeValues: DiscountType[] = [
    DISCOUNT_CODE.ONE_SHOT,
    DISCOUNT_CODE.PERCENT,
    DISCOUNT_CODE.PACK
];


export const DiscountTypeWithProductValues: DiscountType[] = [
    DISCOUNT_CODE.PERCENT,
    DISCOUNT_CODE.ABSOLUTE
];
