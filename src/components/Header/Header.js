import React, {Component} from "react";
import "./header.scss";


class Header extends Component{
    render(){
        return(
          <>
          <a href="http://localhost:3001/"> <img src="Logo.png" alt="Page logo"/></a>
          <p>Encrypt and decrypt your messages <br/> then share them with people.</p>
          </>
        )
    }
}

export default Header;