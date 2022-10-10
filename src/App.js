
import React from 'react';
import '@govtechsg/sgds/css/sgds.css';
import {IntlProvider} from 'react-intl';
import FooterComp from './Components/FooterComp';
import Layout from './Pages/Layout';
import './css/theme.css';
import './css/styles.css';

function App() {
  return (
    <IntlProvider locale="en">
      <div className="App">
        <sgds-masthead fluid></sgds-masthead>
        <Layout></Layout>
        <FooterComp></FooterComp>
      </div>
    </IntlProvider>
  );
}

export default App;