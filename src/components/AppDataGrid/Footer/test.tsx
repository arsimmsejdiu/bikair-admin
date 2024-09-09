import { render } from "@testing-library/react";
import React from "react";

import AppDataGridFooter from "./index";

test("renders learn react link", () => {
    render(
        <AppDataGridFooter
            count={100}
            create
            detail
            limit={10}
            offset={0}
            onPageChange={() => console.log("")}
            onAdd={() => console.log("")}
            onDetail={() => console.log("")}
            selected={false}
        />
    );
});
