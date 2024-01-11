import React from "react";
import styled from 'styled-components'
import logo from "../images/logosmall.png";

export const Navbar = () => {
    return (
        <>
        <Logo>
            <img src = {logo} alt="logo"/>
        </Logo>
        </>
    )
}

const Logo = styled.div`
    display: flex;
    border-bottom : 2px solid black;
    width: 100%;
    height: 80px;
`
