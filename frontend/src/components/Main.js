import React, { useState } from "react";
import { Card } from "./Card";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Detail } from "./Detail";

export const Main = () => {
    const [selectedArticle,setSelectedArticle] = useState(null);
    return (
        <>
        <div className="flex border-b-2 border-black">
            <div className="flex border-r-2 border-black w-7/12">
                dfdafadfadvaevevdfvfvfavafvvavafvafvafvaefvfa
            </div>
            <div className="flex w-5/12">
                <Card />
            </div>
        </div>
        </>
    )
}