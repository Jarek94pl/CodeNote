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
    processKey = ()=>{
        let key = this.state.key
        key = key.toUpperCase().replace(/\s/g, '').replace(/J/g, "I");
        let result = [];
        let temp = '';
        let alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
        for(let i = 0; i < key.length; i++) {
            if (alphabet.indexOf(key[i]) !== -1) {
                alphabet = alphabet.replace(key[i], '');
                temp += key[i];
            }
        }
        temp += alphabet;
        // result = [];
        temp = temp.split('');
        while(temp[0]) {
            result.push(temp.splice(0,5));
        }
        return result;
    };
    cipher = () => {
        let keyresult = this.processKey();
        let res = [];
        let error = 'Warning!!! String is empty';
        let str = this.state.message;
        if(str === '') {
            alert(error);
// error do statu i w renderz3
        }
        // var err = 'ERRORX';
        let textPhrase, separator;
        str = str.toUpperCase().replace(/\s/g, '').replace(/J/g, "I");
        if(str.length === 0) {
            //document.getElementById("printValue").innerHTML = err.toUpperCase().replace(/\s/g, '').replace(/J/g, "I");
        }
        else {
            textPhrase = str[0];
        }
        let help = 0; this.flagAdd = false;
        for(let i = 1; i < str.length; i++) {
            if(str[i - 1] === str[i]) {
                if(str[i] === 'X') {
                    separator = 'Q';
                }
                else {
                    separator = 'X';
                }
                textPhrase += separator + str[i];
                help = 1;
            }
            else {
                textPhrase += str[i];
            }
            if(help === 1) {
                this.flagAdd = true;
            }
        }

        if(textPhrase.length % 2 !== 0) {
            if(textPhrase[textPhrase.length - 1] === 'X') {
                textPhrase += 'Q';
                this.isEnd = true;
                this.flagX = false;
            }
            else {
                textPhrase += 'X';
                this.isEnd = true;
                this.flagX = true;
            }
        }

        let t = [];
        let enCodeStr = '';
        for(let i = 0; i < textPhrase.length; i += 2){
            let pair1 = textPhrase[i];
            let pair2 = textPhrase[i + 1];
            let p1i, p1j, p2i, p2j;
            for(let stroka = 0; stroka < keyresult.length; stroka++) {
                for(let stolbec = 0; stolbec < keyresult[stroka].length; stolbec++){
                    if (keyresult[stroka][stolbec] == pair1){
                        p1i = stroka;
                        p1j = stolbec;
                    }
                    if (keyresult[stroka][stolbec] == pair2){
                        p2i = stroka;
                        p2j = stolbec;
                    }
                }
            }
            let coord1 = '', coord2 = '';

            if(p1i === p2i) {
                if(p1j === 4) {
                    coord1 = keyresult[p1i][0];
                }
                else {
                    coord1 = keyresult[p1i][p1j + 1];
                }
                if(p2j === 4) {
                    coord2 = keyresult[p2i][0];
                }
                else {
                    coord2 = keyresult[p2i][p2j + 1]
                }
            }
            if(p1j === p2j) {
                if(p1i === 4) {
                    coord1 = keyresult[0][p1j];
                }
                else {
                    coord1 = keyresult[p1i + 1][p1j];
                }
                if(p2i === 4) {
                    coord2 = keyresult[0][p2j];
                }
                else {
                    coord2 = keyresult[p2i + 1][p2j]
                }
            }
            if(p1i !== p2i && p1j !== p2j) {
                coord1 = keyresult[p1i][p2j];
                coord2 = keyresult[p2i][p1j];
            }
            enCodeStr = enCodeStr + coord1 + coord2;
        }


        return enCodeStr;
    };
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    };
    encrypt = ()=>{
        //console.log(this.cipher());
        this.setState({result: this.cipher()});


    };
    decrypt = ()=>{
        let deCodeStr = '';
        let text = '';
        let error = "Warning!!! String is empty";
        let text1 = this.cipher();
        if(text1 === '') {
            alert(error);
           // document.getElementById('printDeCode').innerHTML = error;
        }
        let keyresult = this.processKey();
        for(let i = 0; i < text1.length; i += 2){
            let pair1 = text1[i];
            let pair2 = text1[i + 1];
            let p1i, p1j, p2i, p2j;
            for(let stroka = 0; stroka < keyresult.length; stroka++) {
                for(let stolbec = 0; stolbec < keyresult[stroka].length; stolbec++){
                    if (keyresult[stroka][stolbec] == pair1){
                        p1i = stroka;
                        p1j = stolbec;
                    }
                    if (keyresult[stroka][stolbec] == pair2){
                        p2i = stroka;
                        p2j = stolbec;
                    }
                }
            }
            var coord1 = '', coord2 = '';

            if(p1i === p2i) {
                if(p1j === 0) {
                    coord1 = keyresult[p1i][4];
                }
                else {
                    coord1 = keyresult[p1i][p1j - 1];
                }
                if(p2j === 0) {
                    coord2 = keyresult[p2i][4];
                }
                else {
                    coord2 = keyresult[p2i][p2j - 1]
                }
            }
            if(p1j === p2j) {
                if(p1i === 0) {
                    coord1 = keyresult[4][p1j]
                }
                else {
                    coord1 = keyresult[p1i - 1][p1j];
                }
                if(p2i === 0) {
                    coord2 = keyresult[4][p2j];
                }
                else {
                    coord2 = keyresult[p2i - 1][p2j]
                }
            }
            if(p1i !== p2i && p1j !== p2j) {
                coord1 = keyresult[p1i][p2j];
                coord2 = keyresult[p2i][p1j];
            }
            text = text + coord1 + coord2;
        }
        text = text.split('');

        for(let i = 0; i < text.length; i++) {
            let count;
            if (this.flagAdd) {
                if(text[i] === text[i + 2] && (text[i + 1] === 'X' || text[i + 1] === 'Q')) {
                    count = i + 1;
                    text.splice(count, 1);
                }
            }
            else if(this.flagAdd && this.isEnd && (this.flagX || !this.flagX)) {
                if(text[i - 2] === text[i] && (text[i - 1] === 'X' || text[i - 1] === 'Q'))
                    count = i + 1;
                text.splice(count, 1);
            }
            else if(!this.flagAdd) {
                break;
            }
        }
        if(this.flagX) {
            text.pop();
        }
        if(this.isEnd && !this.flagX) {
            text.pop();
        }
        text = text.join('');
        console.log(text);
        this.setState({
            result:text
        })

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
                  <h1>Playfair Cipher</h1>
                  <p>Enter the word that you want to ENCRYPT, then put a key </p>
                  <p>PLAINTEXT</p>
                  <textarea id="p" name="message" rows="3" cols="40" placeholder="Here enter your message" value={this.state.message} onChange={this.handleChange}/>

                  <p>key:<input id="key" name="key" size="5" value={this.state.key} type="text" onChange={this.handleChange}/></p>
                 <p> <input name="btnEn" value="ENCRYPT" onClick={this.encrypt} type="button"/>
                     <input name="btnDec" value="DECRYPT" onClick={this.decrypt} type="button"/> </p>
                  <p>Ciphertext</p> <textarea id="c" name="c" rows="3" cols="40" value={this.state.result} readOnly/>
              </section>
            )
        }
    }
}

export default RailFence;