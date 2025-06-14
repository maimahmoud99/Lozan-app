import { BaseDto } from "./base";

export interface  PromoCodesDto extends BaseDto {
    code: string;
    value: number;
    isPercentage: boolean;
}