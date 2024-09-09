import RouteMenu from "../interfaces/RouteMenu";
import {ACCESS_RIGHTS} from "@bikairproject/shared";

export const dataRoutesValues: RouteMenu[] = [
    {
        title: "Admins",
        path: "/admins",
        accessRights: ACCESS_RIGHTS.ADMINS_READ
    },
    {
        title: "Trajets",
        path: "/trips",
        accessRights: ACCESS_RIGHTS.TRIPS_READ
    },
    {
        title: "Utilisateurs",
        path: "/users",
        accessRights: ACCESS_RIGHTS.USERS_READ
    },
    {
        title: "Pass & Abonnement",
        path: "/subscriptions",
        accessRights: ACCESS_RIGHTS.SUBSCRIPTIONS_READ
    },
    {
        title: "Vélos",
        path: "/bikes",
        accessRights: ACCESS_RIGHTS.BIKES_READ
    },
    {
        title: "Notes",
        path: "/reviews",
        accessRights: ACCESS_RIGHTS.REVIEWS_READ
    },
    {
        title: "Marketing",
        path: "/marketings",
        accessRights: ACCESS_RIGHTS.MARKETINGS_READ
    },
    {
        title: "Promotions",
        path: "/discounts",
        accessRights: ACCESS_RIGHTS.DISCOUNTS_READ
    },
    {
        title: "Roles",
        path: "/roles",
        accessRights: ACCESS_RIGHTS.ROLES_READ
    },
    {
        title: "Cautions",
        path: "/cautions",
        accessRights: ACCESS_RIGHTS.CAUTIONS_READ
    },
    {
        title: "Rapports",
        path: "/reports",
        accessRights: ACCESS_RIGHTS.REPORTS_READ
    },
    {
        title: "Spots",
        path: "/spots",
        accessRights: ACCESS_RIGHTS.SPOTS_READ
    },
    {
        title: "Red Zones",
        path: "/red-zones",
        accessRights: ACCESS_RIGHTS.RED_ZONE_READ
    },
    {
        title: "City Polygon",
        path: "/city-polygon",
        accessRights: ACCESS_RIGHTS.POLYGON_READ
    },
];
