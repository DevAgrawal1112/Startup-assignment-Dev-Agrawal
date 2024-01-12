import React from "react";
import { Navbar } from "./Navbar";
import { Main } from "./Main";

export function Layout() {
    return (
        <div>
            <Navbar/>
            <Main/>
        </div>
    );
}