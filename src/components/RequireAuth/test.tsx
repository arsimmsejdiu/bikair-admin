import { render } from "@testing-library/react";
import React from "react";

import RequireAuth from "./index";

test("renders learn react link", () => {
    render(<RequireAuth/>);
});
