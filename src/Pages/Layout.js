import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavbarContainer } from '../Components/Menu';
import Logo from '../Components/logo';
import Home from "./Home";
import Apply from "./Apply";

const Layout = () => {
    return (
        <>
            <section className="my-8 mx-md-8">
                <NavbarContainer>
                    <Logo></Logo>
                </NavbarContainer>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/apply" element={<Apply />} />
                        {/* <Route exact path="/recovery-password" element={<RecoveryPassword/>}/>
                    <Route path="*" element={<NotFound/>}/> */}
                    </Routes>
                </Router>
            </section>
        </>
    );
}

export default Layout;