import { render } from "@testing-library/react";
import React from "react";

import LoadingOverlay from "./index";

test("renders learn react link", () => {
    render(<LoadingOverlay open={false}/>);
});
