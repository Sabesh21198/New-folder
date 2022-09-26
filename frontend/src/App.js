import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';


function App() {

    const { speak } = useSpeechSynthesis();
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [start, setStart] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        fullname: '',
        email: '',
        contact: ""
    })

    const startListen = () => {
        console.log('Listen starts...')
        resetTranscript()
    }
    SpeechRecognition.startListening({ continuous: true })

    useEffect(() => {   
        if (start) {
            console.log("Listening...")
            SpeechRecognition.startListening({ continuous: true })
            setStart(true)
        }
    }, [start])




    const stop = (e, field) => {
        e.preventDefault();
        setStart(false)
        SpeechRecognition.stopListening()
        setFormData(prev => ({ ...prev, [field]: transcript }))
        console.log('Listen stopped')
    }

    useEffect(() => { 
        console.log("Form Data::", formData) },[formData]);

        const saveUser = async (e)=>{
            e.preventDefault();
            try{
                alert('Submitted...',formData.resetTranscript)
                await axios.post(`http://localhost:5000/datas`,
                 formData).then((response)=>{
                    console.log("response"+response)
                 }).catch(function(error){
                    console.log("error"+error)
                 })               
                }
        catch(error){
            console.log(error);
        }
    
        };



    return (
        <div className='newUser'>
            <h1 className="newUserTitle">Application Form</h1>
            <form className="newUserForm" autoComplete='off'  >
                <div className="newUserItem">
                    <label>User Name</label>
                    <input
                        placeholder="Enter Name" name='name' readOnly value={formData.name}
                    />
                </div>
                <div>
                    <button type='button' className='buttons' onClick={() => speak({ text: "What is your User Name" })}>Speaker</button>
                    <button type='button' className='buttons' onClick={startListen}>Talk</button>
                    <button type='button' className='buttons' onClick={(e) => stop(e, 'name')}>Stop</button>
                </div>

                <br></br>
                <div className="newUserItem" autoComplete='off'>
                    <label>Full Name</label>
                    <input type="text" name='fullname'
                        placeholder="Enter Full Name"
                        readOnly value={formData.fullname} />
                </div>
                <div>
                    <button type='button' className='buttons' onClick={() => speak({ text: "What is your fullName" })}>Speaker</button>
                    <button type='button' className='buttons' onClick={startListen}>Talk</button>
                    <button type='button' className='buttons' onClick={(e) => stop(e, 'fullname')}>Stop</button>
                </div>
                <br />
                <div className="newUserItem" autoComplete='off'>
                    <label>Email</label>
                    <input type="email" name='email'
                        placeholder="Enter email"
                        readOnly value={formData.email} />
                </div>
                <div>
                    <button type='button' className='buttons' onClick={() => speak({ text: "What is your email" })}>Speaker</button>
                    <button type='button' className='buttons' onClick={startListen}>Talk</button>
                    <button type='button' className='buttons' onClick={(e) => stop(e, 'email')}>Stop</button>
                </div>
                <br />
                <div className="newUserItem" autoComplete='off'>
                    <label>Contact</label>
                    <input type="text" name='contact'
                        placeholder="Enter contact"
                        readOnly value={formData.contact} />
                </div>
                <div>
                    <button type='button' className='buttons' onClick={() => speak({ text: "What is your Contact Number" })}>Speaker</button>
                    <button type='button' className='buttons' onClick={startListen}>Talk</button>
                    <button type='button' className='buttons' onClick={(e) => stop(e, 'contact')}>Stop</button>
                </div>
                <button type="button" onClick={saveUser} className="newUserButton">Create</button>
            </form>
        </div>
    );
}

export default App;
