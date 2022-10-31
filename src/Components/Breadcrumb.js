import React from 'react';
import { Row, Col } from '@govtechsg/sgds-react';
import { Breadcrumb, BreadcrumbItem } from '@govtechsg/sgds-react';

const CaaSBreadcrumb = (props) => {
    const { applyBreadCrumb } = props;
    return (
        <Row>
            <Col xs>
                <Breadcrumb className={'mTop-30'}>
                    <BreadcrumbItem href="/">
                        {'Apply'}
                    </BreadcrumbItem>
                    <BreadcrumbItem href="#">
                        {applyBreadCrumb}
                    </BreadcrumbItem>
                    {/* <BreadcrumbItem active>
                        Data
                    </BreadcrumbItem> */}
                </Breadcrumb>
            </Col>
        </Row>
    );
}

export default CaaSBreadcrumb;