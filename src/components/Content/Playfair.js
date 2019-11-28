import React, {Component} from "react";
import "./Playfair.scss";

class Playfair extends Component{
    state = {
        width: 2
    };
    componentDidMount() {
        this.interval = setInterval(()=>{
            if(this.state.width < 105) {
                this.setState({
                    width: this.state.width + 5
                })
            }
        }, 105)
    }

    render(){
        let style = {
            backgroundColor: "#09d3ac",
            width: `${this.state.width}%`,
            height: "1.3rem"


        };
        if(this.state.width < 105){
            return(
                <div className="progress">
                    <div className="progress-bar" style={style}>   LOADING </div>
                </div>
            )
        }else {
            return (
                <section  className="playFair">
                    <header>
                        <h1 className="text-center">Playfair cipher</h1>
                    </header>

                    <main className="container">
                        < div className = "row" >
                            < div id = "wrapper" className = "col-xs-6 col-xs-4 col-sm-offset-4" >
                                < div className = "form-group">
                                    < label className = "control-label" > Keyword:   </label> <br/>
                                    <input id="key" type="text" className="form-control" placeholder="Enter key" required/> <br/>
                                    <label className="control-label">Word or string:</label> <br/>
                                    <input id="String" type="text" className="form-control output" placeholder="Enter a word or string"/>
                                    <div className="firstButton">
                                        <button className="btn btn-primary form-control" onClick="processKey(), cipher()">Code</button>
                                    </div>
                                    <div>
                                        <h4 className="text-center" id="printValue"> </h4>
                                    </div>
                                    <div className="secondButton">
                                    <button className="btn btn-success form-control" onClick="deCodeCipher()">Decode</button>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-center" id="printDeCode"> </h4>
                                </div>
                            </div>
                        </div>
                    </main>
                </section>

            )
        }
    }
}


export default Playfair;