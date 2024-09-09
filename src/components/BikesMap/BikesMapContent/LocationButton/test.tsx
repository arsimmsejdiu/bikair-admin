import { render } from "@testing-library/react";
import React from "react";

import LocationButton from "./index";

test("renders learn react link", () => {
    render(<LocationButton onClick={() => console.log("")}/>);
});
