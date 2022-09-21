import React from 'react';
import { Row, Col } from '@govtechsg/sgds-react';
import { Breadcrumb, BreadcrumbItem } from '@govtechsg/sgds-react';

const CaaSBreadcrumb = () =>{
    return(
        <Row>
            <Col xs>
                <Breadcrumb>
                    <BreadcrumbItem href="https://www.designsystem.tech.gov.sg/">
                        Apply
                    </BreadcrumbItem>
                    {/* <BreadcrumbItem href="https://github.com/GovTechSG/@govtechsg/sgds-react/">
                        Library
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        Data
                    </BreadcrumbItem> */}
                </Breadcrumb>
            </Col>
        </Row>
    );
}

export default CaaSBreadcrumb;