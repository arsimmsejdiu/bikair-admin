import { render } from "@testing-library/react";
import React from "react";

import AppDataGrid from "./index";

test("renders learn react link", () => {
    render(<AppDataGrid
        columns={[]}
        onVisibilityChange={() => console.log("")}
        create={false}
        detail={false}
        upload={false}
        total={0}
        data={[]}
        filters={{
            limit: 100,
            offset: 0,
            orderBy: "id",
            order: "desc",
            value: null,
            operator: null,
            column: null,
            search: null,
            newValue: null,
            newOperator: null,
            newColumn: null,
            newSearch: null,
            newFilter: false,
        }}
        onFilterChange={() => console.log("test")}
        getSelectionId={() => {
            return 1;
        }}
    />);
});
