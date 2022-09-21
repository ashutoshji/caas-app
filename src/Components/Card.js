import React, { useState } from 'react';
import { Row } from '@govtechsg/sgds-react/Row';
import { Col } from '@govtechsg/sgds-react/Col';
import { Card } from '@govtechsg/sgds-react/Card';
import { Button } from '@govtechsg/sgds-react/Button';

const CardContainer = () =>{
    return(
        <>
        <Row>
      <Col xs lg="4">
        <Card className="mBot-30">
          <Card.Img variant="top" alt="img alternate text goes here" src={require("../images/license.jpg")} width="430px" height="230px"/>
          <Card.Body className="cardbody-height">
            <Card.Title className="cardtile-height">Clearance for Aerial Photography / Videography</Card.Title>
            <Card.Text className="cardtext-height">To conduct any aerail photography/videography flights, a clearance is needed.</Card.Text>
            <button type="button" class="btn btn-primary sgds btn-gap btn-gap btn-caas btn-primary-caas">Apply</button>
            <button type="button" class="btn btn-outline-primary sgds btn-caas btn-default-caas">Read more</button>
          </Card.Body>
        </Card>
      </Col>
      <Col xs lg="4">
        <Card className="mBot-30">
          <Card.Img variant="top" alt="img alternate text goes here" src={require("../images/license.jpg")} width="430px" height="230px"/>
          <Card.Body className="cardbody-height">
            <Card.Title className="cardtile-height">Clearance for Erection of Cranes and Tall Construction Machinery</Card.Title>
            <Card.Text>Development of buildings, use of tall construction machineries such as cranes can potentially affect safety of air navigation either due to the close proximity between the stru...</Card.Text>
            <button type="button" class="btn btn-primary sgds btn-gap btn-caas btn-primary-caas">Apply</button>
            <button type="button" class="btn btn-outline-primary sgds btn-caas btn-default-caas">Read more</button>
          </Card.Body>
        </Card>
      </Col>
      <Col xs lg="4">
        <Card className="mBot-30">
          <Card.Img variant="top" alt="img alternate text goes here" src={require("../images/license.jpg")} width="430px" height="230px"/>
          <Card.Body className="cardbody-height">
            <Card.Title className="cardtile-height">Clearance for Ship Crossing</Card.Title>
            <Card.Text className="cardtext-height">The conduct of ship corssing can potentially affect safety of air navigation either due to the close proximity between the vessel and an....</Card.Text>
            <button type="button" class="btn btn-primary sgds btn-gap btn-gap btn-caas btn-primary-caas">Apply</button>
            <button type="button" class="btn btn-outline-primary sgds btn-caas btn-default-caas">Read more</button>
          </Card.Body>
        </Card>
      </Col>
      <Col xs lg="4">
        <Card className="mBot-30">
          <Card.Img variant="top" alt="img alternate text goes here" src={require("../images/license.jpg")} width="430px" height="230px"/>
          <Card.Body className="cardbody-height">
            <Card.Title className="cardtile-height">Permit for Aerial Activities</Card.Title>
            <Card.Text className="cardtext-height">Some aerial activities can potentially pose a hazard to air navigation, either due to the close proximity between an object in the air and an overflying aircraft...</Card.Text>
            <button type="button" class="btn btn-primary sgds btn-gap btn-gap btn-caas btn-primary-caas">Apply</button>
            <button type="button" class="btn btn-outline-primary sgds btn-caas btn-default-caas">Read more</button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
        </>
    );
}

export default CardContainer;
