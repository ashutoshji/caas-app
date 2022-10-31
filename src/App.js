
import React from 'react';
import '@govtechsg/sgds/css/sgds.css';
//import 'react-table/react-table.css';
import FooterComp from './Components/FooterComp';
import Layout from './Pages/Layout';
import './css/theme.css';
import './css/styles.css';

function App() {
  return (
    <div className="App">
      <sgds-masthead fluid></sgds-masthead>
      <Layout></Layout>
      <FooterComp></FooterComp>
    </div>
  );
}

export default App;