import React,{useState} from "react";
import axios from "axios";



function Form() {
    const[showPage, showSetPage] = useState(true);
    const [configInfo, setConfigInfo]= useState({appId:"", sendersEmail:"",password:"", recipient:"", subject:"", message:""})



    //previous and next buttons
    const handlePreviousPage=()=>{
        showSetPage(true)
    }
    const handleNextPage=()=>{
        showSetPage(false)
    }
    
    //handle submit
    function handleSubmit(e){
      e.preventDefault()
      const data = {appId:configInfo.appId, sendersEmail:configInfo.sendersEmail,password:configInfo.password, recipient:configInfo.recipient,subject:configInfo.subject, message:configInfo.message}
      const header = new Headers();
      header.append('Access-Control-Allow-Origin', '*');
      axios.post('http://localhost:8000', data, header)
        .then(res=>{
          console.log(res)
          setConfigInfo(res.data)
          // alert("email sent successfully")
        })  
        .catch(err=>{
          console.log(err)
        })

    }

    return (
      <div className="row">
      <div className="col-md-6 col-md-offset-3">
          <form id="msform" onSubmit={e=>{handleSubmit(e)}}>
          {/* <form id="msform"> */}
              <ul id="progressbar">
                  <li className="active">Configurations</li>
                  <li>Compose Email</li>
              </ul>
              {showPage ?
                <fieldset>
                  <h2 className="fs-title">Configurations</h2>
                  <input type="text" name="appID" placeholder="App Id" onChange={e=>setConfigInfo({...configInfo,appId:e.target.value})}/>
                  <input type="text" name="sendersemail" placeholder="Senders Email" onChange={e=>setConfigInfo({...configInfo,sendersEmail:e.target.value})}/>
                  <input type="password" name="password" placeholder="Password" onChange={e=>setConfigInfo({...configInfo,password:e.target.value})}/>
                  <input type="button" name="next" className="next action-button" value="Next" onClick={handleNextPage}/>
              </fieldset>
              :
              <fieldset>
                  <h2 className="fs-title">Compose</h2>
                  <h3 className="fs-subtitle">Compose Email</h3>
                  <input type="text" name="recipient" placeholder="To" onChange={e=>setConfigInfo({...configInfo,recipient:e.target.value})}/>
                  <input type="text" name="subject" placeholder="Subject" onChange={e=>setConfigInfo({...configInfo,subject:e.target.value})}/>
                  <textarea type="text" name="message" placeholder="Message" onChange={e=>setConfigInfo({...configInfo,message:e.target.value})}/>
                  <input type="button" name="previous" className="previous action-button-previous" value="Previous" onClick={()=>handlePreviousPage()}/>
                  <input type="submit" name="submit" className="submit action-button" value="Submit"/>
              </fieldset>
              }
          </form>
          <div className="dme_link">
              <p><a href="https://agnes-muita.vercel.app/" target="_blank" rel='noreferrer'>Design By Aggie</a></p>
          </div>
        </div>
        </div>
    )

}

export default Form