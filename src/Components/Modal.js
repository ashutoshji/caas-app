import React from 'react';
import { Modal } from '@govtechsg/sgds-react/Modal';

const CaasModal = (props) =>{
    const { show, handleClose } = props
    return(
        <Modal show={show} onHide={handleClose} fullscreen="lg-down">
          <Modal.Header closeButton>
                <Modal.Title><i className="bi bi-exclamation-triangle me-3"></i>Aerial Photography / Videography</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h3 className='mTop-50 mBot-20'>Description</h3>
            <div className=''>Time to fill: 30 minutes <br/>
                To conduct any aerail photography/videography flights, a clearance is needed.
            </div>
            <h3 className='mTop-50 mBot-20'>Documents required</h3>
            <div className=''>To conduct any aerail photography/videography flights, a clearance is needed.</div>
            <h3 className='mTop-50 mBot-20'>Cost</h3>
            <div className=''>Free</div>
            <h3 className='mBot-50 mBot-20'>7 days</h3>
            <div className='mTop-50'>Contact</div>
          </Modal.Body>
      </Modal>
    );
}

export default CaasModal;