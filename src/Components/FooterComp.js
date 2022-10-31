import React from 'react';
import { Footer } from '@govtechsg/sgds-react/Footer';

const FooterComp = () => {
    return (
        <Footer className='padding-wrapper'>
            <Footer.Top className='footer-bg-color'>
                <Footer.Top.Header headerTitle="CAAS Aerial Activities Permit Application System">
                    <h3 className='footer-subheader'>Apply for other SG licences</h3>
                    <h3 className='footer-headertext'>GoBusiness</h3>
                </Footer.Top.Header>
                <Footer.Top.ContactLinks>
                    <a href="">Contact</a>
                    <a href="">Feedback</a>
                </Footer.Top.ContactLinks>
            </Footer.Top>
            <Footer.Bottom>
                <Footer.Bottom.Links>
                    <a
                        href="https://tech.gov.sg/report_vulnerability"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Report Vulnerability
                    </a>
                    <a href="">Privacy</a>
                    <a href="">Terms of use</a>
                </Footer.Bottom.Links>
                <Footer.Bottom.Copyrights>
                    © 2022 Government of Singapore. Last Updated 08 Feb 2022
                </Footer.Bottom.Copyrights>
            </Footer.Bottom>
        </Footer>
    );
}

export default FooterComp;