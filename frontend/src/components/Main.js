import React from "react";
import styled from 'styled-components';
import { Card } from "./Card";

export const Main = () => {
    return (
        <>
        <Items>
            <Card/>
            <Map>
                dev
            </Map>
            <Cards>
                agrawal
            </Cards>
        </Items>
        </>
    )
}

const Items = styled.div`
    display: flex;
    border-bottom : 2px solid black;
    width: 100%;
`

const Map = styled.div`
    width: 60%;
    height: 620px;
    border-right : 2px solid black;
`

const Cards = styled.div`
    display: flex;
    justify-content: space-between;
`