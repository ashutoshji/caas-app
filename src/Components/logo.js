import React from "react";

const Logo = () => {
    return (
        <>
            <img src={process.env.PUBLIC_URL + "/images/logo.jpg"} alt="CAAS" width="127px" height="71px" />
        </>
    )
}

export default Logo;