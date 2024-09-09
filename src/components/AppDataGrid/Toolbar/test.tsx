import { render } from "@testing-library/react";
import React from "react";

import AppDataGridToolbar from "./index";

test("renders learn react link", () => {
    render(<AppDataGridToolbar upload={false} onApplyClick={() => console.log("test")} newFilter
        onSearchChange={() => console.log("test")}/>);
});
