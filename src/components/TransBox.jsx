import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import GetBox from './GetBox';
import {success, error} from '../thaywo/NotifyMe';
import copy from 'copy-to-clipboard';
import {AiFillCopy} from 'react-icons/ai';
import {MdClear} from 'react-icons/md';
import Animeme from './Animeme';

const TransBox = () => {
  const [q, setQ] = useState("");
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [output, setOutput] = useState("");

  const handleSelectChange = ({ target: { value, id } }) => {
      id === "source" && setSource(value);
      id === "target" && setTarget(value);
  }

  const handleGetRequest = async () => {
      if (q.length < 1) {
          setOutput("");
          return false;
      };
      if (source === "" || target === "") {
          return error("Please select language");
      }
      try {
          let res = await axios.post("", { q, source, target, format: "text" });
          res = res.data.translatedText;
          setOutput(res);
      } catch (err) {
          console.log(err);
      }
  }

  const copyToClipboard = (text) => {
      copy(text);
      success("Copied to clipboard!")
  }

  const resetText = () => {
      if (q === "" && output === "") {
          error("Textbox is already empty!")
      } else {
          success("Text removed!")
          setQ("");
          setOutput("");
      }
  }

//Debounce Function
  useEffect(() => {

      let timerID = setTimeout(() => {
          handleGetRequest();
      }, 1000);

      return () => {
          clearTimeout(timerID);
      }

  }, [q]);

  return (
    <>
    <div className="mainBox">
      <div>
        <GetBox id={'source'} select={handleSelectChange} />
        <div className="box">
          <textarea onChange={(e) => { setQ(e.target.value)}} value={q}  className="outputResult"></textarea>
        </div>
        <div className="iconBox">
          <p>{q.length} /300</p>
          <AiFillCopy onClick={() => {copyToClipboard(q)}} className="icon" />
          <MdClear onClick={resetText} className="icon" />
        </div>
      </div>

      <div>
        <GetBox id={'target'} select={handleSelectChange} />
        <div className="outputResult box">
          <p id="output">{output}</p>
          </div>
          <div className="iconBox">
            <p>{output.length}/300</p>
            <AiFillCopy onClick={ () => {copyToClipboard(output)}} className="icon" />
          </div>
      </div>
    </div>
    <Animeme/>
    <div className="tagLine">
      <div className="madeByThaywo">
        Made with ❤️ by Taiwo Hassan
      </div>
    </div>
    </>
    
  )
}

export default TransBox