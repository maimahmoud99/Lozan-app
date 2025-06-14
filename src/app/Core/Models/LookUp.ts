import { BaseDto } from "./base";

export interface LookUpDto extends BaseDto {
    code: string;
    name: string;
}

export interface LkDirectionInfoDto extends LookUpDto {
    directionId: number;
}



export interface CountryDto extends BaseDto {
    code: string;
    nameAr: string;
    nameEn: string;
    cites: CityDto[];
}

export interface CityDto extends BaseDto {
    code: string;
    nameAr: string;
    nameEn: string;
    countryId: number;
}