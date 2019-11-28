import React, {Component} from "react";
import "./content.scss";
import {Link} from "react-router-dom";

class Content extends Component{
    render(){
        return(
            <section className="firstWidget">
                <h1>Choose type of ciphering</h1>
               <div className="typesOfCiphering"  >
                <div className="playfairCipher" >
                    <Link to={"/playfair"}><p>PLAYFAIR CIPHER</p></Link>
                </div>
                <div className="railFenceCipher"  >
                    <Link to={"/railfence"}><p>RAIL FENCE CIPHER</p></Link>
                </div>
               </div>
            </section>
        )}
}

export default Content;