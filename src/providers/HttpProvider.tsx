import * as React from "react";
import { setupInterceptors } from "services/http";

export default function HttpProvider ({ children }: { children: React.ReactNode }) {
    setupInterceptors();

    return (
        <div>{children}</div>
    );
}
