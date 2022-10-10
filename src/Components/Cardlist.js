import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Row } from '@govtechsg/sgds-react/Row';
import { Col } from '@govtechsg/sgds-react/Col';
import { Card } from '@govtechsg/sgds-react/Card';
import CaasModal from './Modal';
import Constant from '../constants';

const CardList = () => { 
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const openModal = () => setShow(true);
    const handleClose = () => setShow(false);
    const openApply = (event, param) => {
        event.preventDefault();
       navigate('/apply', {state: { detail: param.header, id: param.id }});
    };
    return(
            <Row>
                {Constant.card.map((caasCard, index) => {
                    return(
                        <>
                        <Col xs lg="4" key={index+1}>
                            <Card className="mBot-30">
                            <Card.Img variant="top" alt="img alternate text goes here" src={process.env.PUBLIC_URL + caasCard.img} width="430px" height="230px"/>
                            <Card.Body className="cardbody-height">
                                <Card.Title className="cardtile-height">{caasCard.title}</Card.Title>
                                <Card.Text className="cardtext-height">{caasCard.text}</Card.Text>
                                <button type="button" onClick={e=>openApply(e, caasCard)} className="btn btn-primary sgds btn-gap btn-gap btn-caas btn-primary-caas">Apply</button>
                                <button type="button" onClick={openModal} className="btn btn-outline-primary sgds btn-caas btn-default-caas">Read more</button>
                            </Card.Body>
                            </Card>
                        </Col>
                        <CaasModal show={show} handleClose={handleClose}></CaasModal>
                        </>
                    );
                })}
            </Row>
    );
};

export default CardList;

