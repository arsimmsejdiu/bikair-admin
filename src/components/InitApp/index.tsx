import {useAppDispatch} from "hooks/useAppDispatch";
import useAuth from "hooks/useAuth";
import i18n from "i18next";
import {columns as RoleColumns} from "models/data/Roles";
import {columns} from "models/data/Spots";
import {useEffect} from "react";
import {initReactI18next} from "react-i18next";
import {
    setAccessRights,
    setAccessRightsName,
    setCities,
    setCitiesNames,
    setCitiesPolygon,
    setCitiesRedZones,
    setRoles,
    setRolesName
} from "redux/slices/global";
import {getCities, getCitiesPolygon, getCitiesRedZones} from "services/cities";
import {getRemoteConfigJson, initRemoteConfig} from "services/firebase";
import {getAccessRights, getRoles} from "services/roles";

export default function InitApp() {
    const {authed} = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        i18n
            .use(initReactI18next) // passes i18n down to react-i18next
            .init({
                resources: {
                    fr: {
                        translation: require("../../i18n/fr.json")
                    }
                },
                lng: "fr", // if you're using a language detector, do not define the lng option
                fallbackLng: "fr",

                interpolation: {
                    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
                },
            }).then(() => {
                initRemoteConfig()
                    .then((fetchedRemotely) => {
                        if (fetchedRemotely) {
                            console.log("Configs were retrieved from the backend and activated.");
                        } else {
                            console.log(
                                "No configs were fetched from the backend, and the local configs were already activated",
                            );
                        }
                        i18n.addResourceBundle("fr", "translation", getRemoteConfigJson("trad_fr"), true, true);
                    });
            });
    }, []);

    useEffect(() => {
        getCities(null, {}).then((result) => {
            const citiesName = result.rows.map((c) => c.name ?? "");
            dispatch(setCities(result.rows));
            dispatch(setCitiesNames(citiesName));
            for (const column of columns) {
                if (column.field === "city_name") {
                    column.values = citiesName;
                    column.defaultValue = citiesName[0];
                }
            }
        });
        getCitiesRedZones().then(result => {
            dispatch(setCitiesRedZones(result));
        });
        getCitiesPolygon().then(result => {
            dispatch(setCitiesPolygon(result));
        });
    }, []);

    useEffect(() => {
        if (authed) {
            getAccessRights(null, {}).then((result) => {
                const accessRightsName = result.rows.map((c) => c.name ?? "");
                dispatch(setAccessRights(result.rows));
                dispatch(setAccessRightsName(accessRightsName));
                for (const column of RoleColumns) {
                    if (column.field === "access_rights") {
                        column.values = accessRightsName;
                        column.defaultValue = [];
                    }
                }
            });
        }
    }, [authed]);

    useEffect(() => {
        if (authed) {
            getRoles(null, {}).then((result) => {
                const rolesName = result.rows.map((rn) => rn.name);
                dispatch(setRoles(result.rows));
                dispatch(setRolesName(rolesName));
            });
        }
    }, [authed]);

    return null;
}
