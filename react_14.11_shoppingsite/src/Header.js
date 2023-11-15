import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Cart from "./Cart";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  // clearCart = () => {
  //   this.setState({ cart: [] }, () => {
  //     console.log("Cart emptied:", this.state.cart);
  //   });
  // };

  toggle() {

    if (this.props.sepet == "") {
      this.setState({
        isOpen: false
      });
    }
    else {
      this.setState({
        isOpen: !this.state.isOpen,
      });

    }
  }


  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand style={{ color: "purple", fontSize: "35px" }}>Çetinarslan Market</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={{ fontSize: "20px", marginTop: "5px" }}>
                <NavLink>Ürünler</NavLink>
              </NavItem>


              <NavItem style={{ fontSize: "20px", marginTop: "5px" }}>
              <Cart
                cart={this.props.cart}
                removeToCart={this.props.removeToCart}
                clearCart={this.props.clearCart}
                sepet={this.props.sepet}
              />
            </NavItem>







            {/* {
                this.props.sepet ? <NavItem style={{ fontSize: "20px", marginTop: "5px" }}>
                  <Cart
                    cart={this.props.cart}
                    removeToCart={this.props.removeToCart}
                    clearCart={this.props.clearCart}
                    sepet={this.props.sepet}
                  />
                </NavItem> : ""
              } */}


          </Nav>
        </Collapse>
      </Navbar>
      </div >
    );
  }
}
