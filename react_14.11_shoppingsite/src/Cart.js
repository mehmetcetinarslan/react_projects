import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default class Cart extends Component {

  adem = () => {
    console.log(this.props.sepet)

  }



  render() {
    return (
      <UncontrolledDropdown nav inNavbar>

        <DropdownToggle nav caret>
          Sepet - {this.props.cart.length}
        </DropdownToggle>

        <DropdownMenu right>
          {this.props.cart && this.props.cart.map(cartItem => (
            <DropdownItem key={cartItem.product.id}>
              <span
                onClick={() => this.props.removeToCart(cartItem.product)}
                className="badge badge-danger"
                style={{ marginRight: "10px", backgroundColor: "red" }}
              >
                Sil
              </span>
              {cartItem.product.productName}
              <span
                className="badge badge-warning m-2"
                style={{ color: "green" }}
              >
                {cartItem.quantity}
              </span>
            </DropdownItem>
          ))}

          <DropdownItem divider />

          <DropdownItem onClick={() => this.props.clearCart()}>{this.props.sepet}</DropdownItem>




        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}
