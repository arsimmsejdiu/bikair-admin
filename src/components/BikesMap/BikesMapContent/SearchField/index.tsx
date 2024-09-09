import { GridRowId } from "@mui/x-data-grid/models";
import { GET_BIKES_LIST } from "config/endpoints";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { RawResult } from "leaflet-geosearch/lib/providers/openStreetMapProvider";
import AbstractProvider, {
    EndpointArgument,
    ParseArgument,
    SearchResult
} from "leaflet-geosearch/lib/providers/provider";
import { SearchArgument } from "leaflet-geosearch/src/providers/provider";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { getBikes } from "services/bikes";
import { Operators } from "services/dataFilterUtils";

import "./style.css";
import { GetBikesOutputData } from "@bikairproject/shared";

interface AppSearchArgument extends SearchArgument {
    data: any;
}

const defaultActiveColumns: Record<GridRowId, boolean> = {
    "id": false,
    "uuid": false,
    "tracker_id": false,
    "battery_id": false,
    "lock_id": false
};

class BikeProvider extends AbstractProvider {
    osmProvider = new OpenStreetMapProvider({
        params: {
            "accept-language": "fr", // render results in Dutch
            countrycodes: "fr", // limit search results to the Netherlands
            email: "maxime.lozach@bik-air.com", // auth for large number of requests
        }
    });

    async search (options: AppSearchArgument): Promise<SearchResult<GetBikesOutputData | RawResult>[]> {
        let bikeRows: GetBikesOutputData[] = [];
        let operator = Operators.STR_LIKE;
        if (typeof options.data !== "undefined" && options.data !== null) {
            operator = Operators.STR_EQ;
        }
        try {
            const bikeList = await getBikes({
                limit: 5,
                offset: 0,
                column: "name",
                operator: operator,
                value: options.query,
                search: null,
                order: null,
                orderBy: null
            }, defaultActiveColumns);
            bikeRows = bikeList.rows;
        } catch (error) {
            console.log(error);
        }

        let osmResult: SearchResult<RawResult>[] = [];
        if (bikeRows.length < 5) {
            osmResult = await this.osmProvider.search(options);
        }
        const bikeParseArgument = { data: bikeRows };

        const parseBikes = this.parse(bikeParseArgument);

        return [...parseBikes, ...osmResult].slice(0, 5);
    }

    parse (response: ParseArgument<(GetBikesOutputData)[]>): SearchResult<GetBikesOutputData>[] {
        const result: SearchResult<GetBikesOutputData>[] = [];
        for (const bike of response.data) {
            result.push({
                x: bike.coordinates[1],
                y: bike.coordinates[0],
                bounds: [
                    [bike.coordinates[1] - 0.001, bike.coordinates[0] - 0.001],
                    [bike.coordinates[1] + 0.001, bike.coordinates[0] + 0.001],
                ],
                label: bike.name,
                raw: bike
            });
        }
        return result;
    }

    endpoint (options: EndpointArgument): string {
        return GET_BIKES_LIST;
    }

}

export default function SearchField () {
    const appProvider = new BikeProvider();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const searchControl = new GeoSearchControl({
        provider: appProvider,
        style: "button",
        showMarker: false,
        retainZoomLevel: false,
        animateZoom: true,
    });

    const map = useMap();
    useEffect(() => {
        map.addControl(searchControl);
        return () => {
            map.removeControl(searchControl);
        };
    });
    return null;
}
