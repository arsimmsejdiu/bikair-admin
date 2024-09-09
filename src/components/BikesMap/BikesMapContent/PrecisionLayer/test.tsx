import { render } from "@testing-library/react";
import React from "react";

import PrecisionLayer from "./index";

test("renders learn react link", () => {
    render(<PrecisionLayer position={[0, 0]} radius={0}/>);
});
