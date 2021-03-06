import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Container, ListGroup, Badge, Row, Col, Button } from 'reactstrap';

import Api from '../Utilities/Api';

class EndpointsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endpoints: [],
            loaded: false
        }
    }
    componentDidMount() {
        Api.get('endpoints').then(response => {
            if (response.ok) {
                this.setState({
                    endpoints: response.endpoints,
                    loaded: true
                })
            }
        });
    }
    render() {
        let {loaded, endpoints} = this.state;

        return (
            <Container className="EndpointsPage">
                <Row className="mb-4 justify-content-end">
                    <Col xs="auto" className="float-right">
                        <Link to="/endpoint/create">
                            <Button color="success">Create Endpoint</Button>
                        </Link>
                    </Col>
                </Row>
                { loaded ?
                    <ListGroup>
                        {endpoints.map(endpoint => (
                            <Link to={'endpoint/' + endpoint.id} className="list-group-item-action list-group-item" key={endpoint.id}>
                                <Row>
                                    <Col xs={2} md={1}>
                                        <Badge color="info">{endpoint.method}</Badge>
                                    </Col>
                                    <Col>
                                        <strong>{endpoint.url}</strong>
                                    </Col>
                                </Row>
                            </Link>
                        ))}
                    </ListGroup>:
                    <div>Not loaded</div>}
            </Container>
        )
    }
}

export default EndpointsPage;