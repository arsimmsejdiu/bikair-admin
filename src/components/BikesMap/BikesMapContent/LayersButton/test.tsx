import { render } from "@testing-library/react";
import React from "react";

import BikesFilterButton from "./index";

test("renders learn react link", () => {
    render(<BikesFilterButton onClick={() => console.log("")}/>);
});
