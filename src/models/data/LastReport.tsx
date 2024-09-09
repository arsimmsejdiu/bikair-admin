export interface LastReport {
    id: number;
    uuid: string;
    incidents: string[] | null;
    part_repaired: string[] | null;
    bike_id: number;
    admin_id: number;
    comment: string | null;
    workshop: string | null;
    coordinates: any | null;
    battery_changed: boolean;
    pick_up: boolean;
    spot_id: number | null;
    photos: string[] | null;
    created_at: string;
    updated_at: string;
    lat: string | null;
    lng: string | null;
    spot_name: string | null;
    lastname: string | null;
    firstname: string | null;
    phone: string | null;
    email: string | null;
}
