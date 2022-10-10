import React,{ useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import AddDeleteTableRows from './AddDeleteTableRows';
import Dropdown from './Dropdown';
import SafetyDetailsForm from './SafetyDetailsForm';
import PersonalForm from './PersonalForm';

const AerialPhotoGraphyPermit = (props) =>{
    const [state, setState] = useState(1);
    
    const onChange = (data) => {
        setState(data);
    }
    return(
       <>
       <Row>
        <h2>Instructions</h2>
       <Accordion className='mTop-30 mBot-30'>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Instructions</Accordion.Header>
          <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Aenean vel elit convallis, venenatis mauris vitae, volutpat tellus. 
          Nulla gravida pharetra tempus. Pellentesque quis sem turpis. 
          Sed dignissim, nulla sit amet venenatis pellentesque, sapien augue lacinia magna, vel gravida metus nunc a erat.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <h2>Your Application</h2>
      </Row>
      <Form>
            <Row>
                <Col sm={6}>
                    <label class="form-label" for="formVenueDetails">Purpose</label>
                    <FloatingLabel className="mBot-30" controlId="floatingTextarea2" label="">
                        <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }} className="md-3"
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
            <h3>
                Date / Time of Activity
            </h3>
            <p>
            The time start and time end for each row of date ranges will indicate the time frame for each day within the date range
(e.g. If 20 dec - 25 dec, 2pm - 3pm it means the activity will happen from 2pm-3pm everyday from 20 dec - 25 dec)
            </p>
            <AddDeleteTableRows></AddDeleteTableRows>
            </Row>
                <Dropdown title ={'Type of Flight'} onChange={onChange}></Dropdown>
            <Row>
                <Col sm={6}>
                    <label class="form-label" for="formVenueDetails">Remarks</label>
                    <FloatingLabel className="mBot-30" controlId="floatingTextarea2" label="">
                        <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }} className="md-3"
                        />
                    </FloatingLabel>
                </Col>
                <Col sm={6}>
                <label class="form-label" for="formEmailAddress">Safety Measures</label>
                <div class="mBot-30">
                    <button type="button" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas dark-color">Upload</button>
                </div>
            </Col>
            </Row>
            <SafetyDetailsForm></SafetyDetailsForm>
        </Form>
        <PersonalForm></PersonalForm>
       </>
    );
}

export default AerialPhotoGraphyPermit;