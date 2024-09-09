import { render } from "@testing-library/react";
import React from "react";

import SearchToolbar from "./index";

test("renders learn react link", () => {
    render(<SearchToolbar onValidate={() => console.log("")}
        onTextChange={() => console.log("")}/>);
});
