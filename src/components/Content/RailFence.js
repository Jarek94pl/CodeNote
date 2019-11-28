import React, {Component} from "react";
import "./RailFence.scss";

class RailFence extends Component{
    state = {
        width: 2,
        key: "",
        message:"",
        result:""
    };
    isChet = false;
    isEnd = false;
    flag = false;
    flagX = false;
    flagAdd = false;


    componentDidMount() {
        this.interval = setInterval(()=>{
            if(this.state.width < 105) {
                this.setState({
                    width: this.state.width + 5
                })
            }
        }, 105)
    }
    handleChange = (e)=> {
        this.setState({[e.target.name]: e.target.value})
    };
    encrypt =() =>{
        let plaintext = document.getElementById("p").value.toLowerCase().replace(/[^a-z]/g, "");
        if(plaintext.length < 1){ alert("please enter some plaintext"); return; }
        var key = parseInt(document.getElementById("key").value);
        if(key > Math.floor(2*(plaintext.length-1))){ alert("key is too large for the plaintext length."); return; }
         let ciphertext = "";
        for(this.line=0; this.line<key-1; this.line++){
             let skip=2*(key-this.line-1);  let j=0;
            for( let i=this.line; i<plaintext.length;){
                ciphertext += plaintext.charAt(i);
                if((this.line==0) || (j%2 == 0)) i+=skip;
                else i+=2*(key-1) - skip;
                j++;
            }
        }
        for( let i=this.line; i<plaintext.length; i+=2*(key-1)) ciphertext += plaintext.charAt(i);
        document.getElementById("c").value = ciphertext;
    };

    decrypt =()=> {
         let ciphertext = document.getElementById("c").value.toLowerCase().replace(/[^a-z]/g, "");
        if(ciphertext.length < 1){ alert("please enter some ciphertext (letters only)"); return; }
        var key = parseInt(document.getElementById("key").value);
        if(key > Math.floor(2*(ciphertext.length-1))){ alert("please enter 1 - 22."); return; }
        let  pt = new Array(ciphertext.length);  let k=0;
        for( let line=0; line<key-1; line++){
             let skip=2*(key-line-1);   let j=0;
            for (let i=line; i<ciphertext.length;){
                pt[i] = ciphertext.charAt(k++);
                if((line==0) || (j%2 == 0)) i+=skip;
                else i+=2*(key-1) - skip;
                j++;
            }
        }
        for( let i=this.line; i<ciphertext.length; i+=2*(key-1)) pt[i] = ciphertext.charAt(k++);
        //document.getElementById("p").value = pt.join("");
        document.getElementById("c").value = pt.join("");

    };
    render(){
        let style = {
            backgroundColor: "#09d3ac",
            width: `${this.state.width}%`,
            height: "20px"
        };
        if(this.state.width < 105){
            return(
                <div className="progress">
                    <div className="progress-bar" style={style}>LOADING</div>
                </div>
            )
        }else {
            return(
              <section className="railFence">
                  <h1>Rail Fence Cipher</h1>
                  <p>Enter the word that you want to ENCRYPT, then put a key </p>
                  <p>PLAINTEXT</p>
                  <textarea id="p" name="message" rows="3" cols="40" placeholder="Here enter your message" value={this.state.message} onChange={this.handleChange}/>

                  <p>key(1-22):<input id="key" name="key" size="5" value={this.state.key} type="text" onChange={this.handleChange}/></p>
                 <p> <input name="btnEn" value="ENCRYPT" onClick={this.encrypt} type="button"/>
                     <input name="btnDec" value="DECRYPT" onClick={this.decrypt} type="button"/> </p>
                  <p>Ciphertext</p> <textarea id="c" name="c" rows="3" cols="40" value={this.state.result} readOnly />
              </section>
            )
        }
    }
}

export default RailFence;