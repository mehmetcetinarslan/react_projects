import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardGroup,
  CardTitle,
  Button,
  Col,
} from "reactstrap";

export default class Products extends Component {
  
  render() {
    const { products } = this.props;
    return (
      <div>
        <h2 style={{color:"blue", margin:"8px", padding:"3px"}}>{this.props.currentCategory}</h2>
        <CardGroup>
          {products.map((product) => (
            <Col xs="5">
              <Card
                style={{ marginLeft: "5px", marginRight: "5px", marginBottom:"5px" }}
                key={product.id}
              >
                
                <CardBody>
                  <CardTitle style={{ fontSize:"25px", color:"darkred"}}>{product.productName}</CardTitle>
                  <CardText style={{ fontSize:"15px", color:"darkgreen"}} >{product.desc}</CardText>
                    <CardText>
                        <small style={{ color:"darkblue"}}>{product.price} ₺</small>
                    </CardText>
                  <Button className="btn btn-success" onClick={() => this.props.addToCart(product)}> 
                    Sepete Ekle
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </CardGroup>
      </div>
    );
  }
}
