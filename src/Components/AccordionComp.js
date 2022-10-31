import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

const AccordionComp = (props) => {

  const { dataKey = 1 } = props;
  return (
    <Accordion className='mTop-30 mBot-30 mLeft-30 mRight-30' alwaysOpen defaultActiveKey={['0', '1', '2', '3', '4', '5', '6']}>
      {dataKey === 1 && <Accordion.Item eventKey="0">
        <Accordion.Header>Instructions</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>}
      {dataKey === "KITE" && <Accordion.Item eventKey="1">
        <Accordion.Header>Instructions</Accordion.Header>
        <Accordion.Body>
          <h3>
            Kite-flying/parasailing
          </h3>
          <ul>
            <li>
              With effect from 17 December 2012, legislation on aerial activities in the Singapore Air Navigation Order has been amended to relax height restrictions on kite-flying and parasailing in areas where such activities will not affect aircraft operations
            </li>
            <li>
              The limits that are now in effect are as follows:
              <p>
                - Kite-flying or parasailing is not permitted within 5km of an aerodrome <br />
                - Kite-flying or parasailing at a height more than 200ft above mean sea level is not permitted under the flight funnels of Paya Lebar aerodrome or Tengah aerodrome, beyond 5km but within 10km of these respective aerodromes <br />
                - Elsewhere, kite-flying or parasailing is permitted up to 500ft above mean sea level. <br />
              </p>
            </li>
            <li>
              If you are planning for a kite-flying / parasailing event which may take place in an area where the activity is not permitted or if the height of the activity exceeds the limits listed in sub-paragraphs 2b and 2c, you are required to obtain a permit from CAAS. Such an application for permit will be assessed on a case-by-case basis
            </li>
            <li>
              To apply for a permit, please proceed to complete the online form for kite-flying/parasailing and submit the completed form to CAAS at least 7 working days prior to the date of activity. You are advised to ensure the processing time of 7 working days is factored into your plans for the activity as the processing of an application for a permit will include coordinating with other agencies, including RSAF (which will be notified upon the submission of a duly completed online form).
            </li>
            <li>
              For the safety of air navigation, you are advised to take all necessary measures to ensure the safe conduct of the kite-flying and parasailing activities so that the activities will not pose a hazard to air navigation.
            </li>
            <li>
              If you have any queries for CAAS, please contact us at CAAS_ATS_ANSP@caas.gov.sg
            </li>
            <li>
              If you have any specific queries for RSAF regarding the flying or operating of kites or parasails , please email MINDEF_Feedback_Unit@starnet.gov.sg
            </li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>}
      {dataKey === "BRELEASE" && <Accordion.Item eventKey="2">
        <Accordion.Header>Instructions</Accordion.Header>
        <Accordion.Body>
          <h3>
            Release of balloons
          </h3>
          <ul>
            <li>
              Large clusters of free-flying helium balloons in the air can pose a distraction to pilots engaged in critical phases of flight (landing or taking off) at aerodromes; or operating helicopters at low levels. Balloons may even be ingested into aircraft engines, causing damage that would endanger the lives of passengers and crew on board. With effect from 17 December 2012, legislation on aerial activities in the Singapore Air Navigation Order has been amended to impose restrictions on the release of free-flying helium balloons for the safety of air navigation.
            </li>
            <li>
              The release of free-flying helium balloons into the air is not allowed within 5km of Seletar Airport or Changi Airport and during the operating hours of the military aerodromes (i.e. Mondays to Fridays from 7.00 a.m. to 7.00 p.m. and Saturdays from 7.00 a.m. to 1.00 p.m).
            </li>
            <li>
              Beyond 5km of Seletar and Changi Airports, and outside the operating hours of the military aerodromes, the release of balloons individually, or together as a cluster that does not exceed 2 metres in any linear dimension, may be permitted provided CAAS has been notified.
            </li>
            <li>
              If you wish to release free-flying helium balloons into the air within the areas listed in paragraph 2 and/or exceed the restrictions listed in paragraph 3, you are required to obtain a permit from CAAS. Such an application will be assessed on a case-by-case basis.
            </li>
            <li>
              For the purpose of notification of release of free-flying helium balloons to CAAS (see paragraph 3), or application for a permit (see paragraph 4), please proceed to complete the online form for release of free-flying helium balloons and submit the completed form to CAAS at least 7 working days prior to the date of release. You are advised to ensure the processing
            </li>
            <li>
              If you have any queries for CAAS, please contact us at CAAS_ATS_ANSP@caas.gov.sg
            </li>
            <li>
              If you have any specific queries for RSAF regarding the release of free-flying helium balloons, please email MINDEF_Feedback_Unit@starnet.gov.sg
            </li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>}
      {dataKey === "BHOISTING" && <Accordion.Item eventKey="3">
        <Accordion.Header>Instructions</Accordion.Header>
        <Accordion.Body>
          <h3>Hoisting of captive balloons</h3>
          <ul>
            <li>With effect from 17 December 2012, legislation on aerial activities in the Singapore Air Navigation Order has been amended to allow for relaxation of height limits and implementation of differentiated areas for hoisting of captive balloons / blimps, without compromising aviation safety. </li>
            <li>If you are planning for any activity that will involve the hoisting of a captive balloon / blimp, you should be aware of the new limits that are now in effect:<br />
              <p>
                - Within 1km from the flight funnels of an aerodrome (see map below), hoisting of a captive balloon / blimp is not permitted;<br />
                - Outside the flight funnels but within 5km of an aerodrome, hoisting of a captive balloon / blimp is permitted up to 130ft above mean sea level;<br />
                - Beyond 5km of an aerodrome and its flight funnels, hoisting of a captive balloon / blimp is permitted up to 290ft above mean sea level; and<br />
                - The captive balloon / blimp to be hoisted shall not exceed 3 metres in any linear dimension.
              </p>
            </li>
            <li>If you are planning for an activity that is within the limits listed above, you are required to notify CAAS.</li>
            <li> If the planned balloon / blimp hoisting activity is to take place in an area where the activity is not permitted or if the height of the activity exceeds the limits listed in sub-paragraphs 2b and 2c, you are required to obtain a permit from CAAS. Such an application will be assessed on a case-by-case basis.</li>
            <li>For the purpose of notification of activity to CAAS (see paragraph 3), or application for a permit (see paragraph 4), please proceed to complete the online form and submit the completed form to CAAS at least 7 working days prior to the commencement date of the said activity. You are advised to ensure the processing time of 7 working days is factored into your plans for the activity as the processing of notification or an application for a permit will include coordinating with other government agencies, including RSAF (which will be notified upon the submission of a duly completed online form).</li>
            <li>You are also advised to consult and obtain the necessary clearances from BCA at the following address: <br />
              BCA <br />
              Director <br />
              Building Plan & Management Division <br />
              Advertisement Licensing Section <br />
              5 Maxwell Road, # 16-00 <br />
              Tower Block MND Complex <br />
            </li>
            <li>
              If you have any queries for CAAS, please contact us at CAAS_ATS_ANSP@caas.gov.sg
            </li>
            <li>
              If you have any specific queries for RSAF regarding the hoisting of captive balloons, please email MINDEF_Feedback_Unit@starnet.gov.sg
            </li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>}
      {dataKey === "FIREWORKS" && <Accordion.Item eventKey="4">
        <Accordion.Header>Instructions</Accordion.Header>
        <Accordion.Body>
          <h3>
            Fireworks/Pyrotechnics Display
          </h3>
          <ul>
            <li>
              Discharges of fireworks and pyrotechnics may cause glare or distraction to pilots and thus can be hazardous to aircraft operations. To ensure the safety of air navigation, fireworks and/or pyrotechnics displays are generally not permitted in the vicinity of an aerodrome.
            </li>
            <li>
              If you are planning for an activity involving displays of fireworks and/or pyrotechnics, you are required to obtain a permit from CAAS.
            </li>
            <li>
              To apply for a permit, please proceed to complete the online form for the conduct of fireworks and/or pyrotechnics display and submit the completed form to CAAS at least 7 working days prior to the date of activity. An application for permit will be assessed on a case-by-case basis. You are advised to ensure the processing time of 7 working days is factored into your plans for the activity as the processing of an application for a permit will include coordinating with other agencies, including RSAF (which will be notified upon the submission of a duly completed online form).
            </li>
            <li>
              For the conduct of any display of fireworks and/or pyrotechnics, you are required to take all necessary measures to ensure that lights from the display will not pose a hazard to air navigation.
            </li>
            <li>
              You are also advised to consult and obtain the necessary clearances from the following agencies:
              <p>
                - SPF <br />
                Arms & Explosives Licence <br />
                http://www.spf.gov.sg/licence/frameset_AE.html <br />
                - SCDF <br />
                Application for Discharge of Dangerous Fireworks <br />
                https://licences.business.gov.sg <br />
                Tel: 68481411<br />
                Please note that these agencies may require longer processing time and you may wish to factor this into your planning. <br />
              </p>
            </li>
            <li>
              If you have any queries for CAAS, please contact us at CAAS_ATS_ANSP@caas.gov.sg
            </li>
            <li>
              If you have any specific queries for RSAF regarding the release of sky lanterns, please email MINDEF_Feedback_Unit@starnet.gov.sg
            </li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>}
      {dataKey === "SLRELEASE" && <Accordion.Item eventKey="5">
        <Accordion.Header>Instructions</Accordion.Header>
        <Accordion.Body>
          <h3>
            Sky Lanterns
          </h3>
          <ul>
            <li>
              Sky lanterns when released into the air, besides being a fire hazard, can pose a hazard to aircraft operating in the vicinity. For safety of air navigation and for the safety of the people around you, alternatives including tethering the sky lanterns to the ground can mitigate against such hazards.
            </li>
            <li>
              For safety of air navigation, the release of sky lanterns into the air is not allowed within 5 kilometres of Seletar Airport or Changi Airport and during the operating hours of the military aerodromes (i.e. Mondays to Fridays from 7.00 a.m. to 7.00 p.m. and Saturdays from 7.00 a.m. to 1.00 p.m).
            </li>
            <li>
              Beyond 5km of Seletar and Changi Airports, and outside the operating hours of the military aerodromes, the release of sky lanterns is possible provided its flight can be effectively limited to a height below 200 feet above mean sea level and CAAS has been notified.
            </li>
            <li>
              If you wish to conduct the release of sky lanterns into the air within the areas detailed in paragraph 2 and/or exceed the restrictions listed in paragraph 3, you are required to obtain a permit from CAAS. Such an application will be assessed on a case-by-case basis.
            </li>
            <li>
              You should also be aware that the sky lanterns to be released should not exceed 2 metres in any linear dimension.
            </li>
            <li>
              You are also advised to consult and obtain the necessary clearances from SCDF at the following address:<br />
              <p>
                - SCDF <br />
                Certification Branch (Fire Safety Certificate and Temporary Permit) <br />
                Central Enforcement Dept <br />
                Attn: CPT Effendi Salamoon <br />
                Tel: 68481483 <br />
                - Additional guidelines can be found in the SCDF website at the following URL: <br />
                <a href="#">http://www.scdf.gov.sg/content/scdf_internet/en/building-professionals/fire-safety-permit-and-certification/use-of-sky-lantern.html</a>
              </p>
            </li>
            <li>
              If you have any queries for CAAS, please contact us at CAAS_ATS_ANSP@caas.gov.sg
            </li>
            <li>
              If you have any specific queries for RSAF regarding the release of sky lanterns, please email MINDEF_Feedback_Unit@starnet.gov.sg
            </li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>}
      {dataKey === "LASERS" && <Accordion.Item eventKey="6">
        <Accordion.Header>Instructions</Accordion.Header>
        <Accordion.Body>
          <h3>Lasers</h3>
          <ul>
            <li>Displays of lights, such as lasers or any other high-intensity lights, may cause glare or distraction to pilots and thus can be hazardous to aircraft operations. To ensure the safety of air navigation, such lights displays are generally not permitted in the vicinity of an aerodrome.</li>
            <li>If you are planning for an activity involving displays of fireworks and/or pyrotechnics,you are required to obtain a permit from CAAS.</li>
            <li>To apply for a permit, please proceed to complete the online form for the conduct of fireworks and/or pyrotechnics display and submit the completed form to CAAS at least 7 working days prior to the date of activity. An application for permit will be assessed on a case-by-case basis. You are advised to ensure the processing time of 7 working days is factored into your plans for the activity as the processing of an application for a permit will include coordinating with other agencies, including RSAF (which will be notified upon the submission of a duly completed online form).</li>
            <li>For the conduct of any light display, you are required to take all necessary measures to ensure that lights from the display will not pose a hazard to air navigation</li>
            <li>If you have any queries for CAAS, please contact us at CAAS_ATS_ANSP@caas.gov.sg</li>
            <li>If you have any specific queries for RSAF regarding the release of sky lanterns, please email MINDEF_Feedback_Unit@starnet.gov.sg</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>}
    </Accordion>
  )
}

export default AccordionComp;
