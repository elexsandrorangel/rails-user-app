import React from 'react';
import {Button, Row, Col, InputGroup, Input} from 'reactstrap';
import '../styles/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faEdit } from '@fortawesome/free-solid-svg-icons'

class BaseInfo extends React.Component {
  render(){
      return (
      <Row className = "w-100">
        <Col xs="2" className="py-2">
          <Button className = "mx-1 btn-add btn-search-bar">
            <FontAwesomeIcon icon={faPlus}/>
          </Button>
          <Button className = "mx-1 btn-edit btn-search-bar">
          <FontAwesomeIcon icon={faEdit}/>
          </Button>
        </Col>
        <Col xs="9" className="py-2">
          <InputGroup>    
            <Input placeholder="Buscar"/>
          </InputGroup>
        </Col>
        <Col xs="1"className="py-2">
          <Button className = "btn-del btn-search-bar">
            <FontAwesomeIcon icon={faMinus}/>
          </Button>
          </Col>

      </Row>
        
    );
  }
}

export default BaseInfo;