import {Polygon} from "./Polygon";

export interface CityPolygon {
    id?: number;
    city_id?: number;
    city_name?: string;
    name?: string | null;
    polygon?: Polygon | null;
    status?: string | null;
    created_at?: string;
    updated_at?: string;
}
