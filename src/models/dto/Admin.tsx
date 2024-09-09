export interface Admin {
    id?: number,
    uuid?: string,
    firstname?: string | null,
    lastname?: string | null,
    email?: string | null,
    phone?: string | null,
    roles?: string[],
    city_name?: string[],
    locale?: string | null,
    password?: string | null,
    username?: string | null,
    device_token?: string | null,
    topics?: string[] | null,
    lock_access?: boolean | null,
    update_address?: boolean | null
    created_at?: string,
    updated_at?: string,
}
