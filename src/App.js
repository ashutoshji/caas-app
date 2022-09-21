
import React from 'react';
import '@govtechsg/sgds/css/sgds.css';
import { NavbarContainer } from './Components/Menu';
import CaaSBreadcrumb from './Components/Breadcrumb'
import CardContainer from './Components/Card';
import FooterComp from './Components/FooterComp';
import Logo from './Components/logo';
import './css/theme.css';
import './css/styles.css';

function App() {
  return (
    <div className="App">
      <sgds-masthead fluid></sgds-masthead>
      <section className="my-8 mx-md-8">
        <NavbarContainer>
          <Logo></Logo>
        </NavbarContainer>
        <CaaSBreadcrumb></CaaSBreadcrumb>
        <CardContainer></CardContainer>
      </section>
      <FooterComp></FooterComp>
    </div>
  );
}

export default App;