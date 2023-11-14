import React, { useState, useEffect } from "react";

// This function is used to get all the voices available on the browser
// and returns an array of options for the user to select from
const setAvailableVoices = function getAllVoicesForSelection() {
  let voiceSelection = [];
  const availableVoices = window.speechSynthesis.getVoices();
  if (availableVoices.length > 0) {
    voiceSelection = availableVoices.map((voice, i) => (
      <option key={i} value={i}>
        {voice.name}
      </option>
    ));
  }
  return voiceSelection;
};

const SpeechToText = ({ message }) => {
  const speech = new SpeechSynthesisUtterance();
  const [voices, setVoices] = useState([]);
  // const [voice, setVoice] = useState(""); // voices[0]
  // const [rate, setRate] = useState(1);
  // const [volume, setVolume] = useState(1);
  // const [pitch, setPitch] = useState(1);


  useEffect(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices && availableVoices.length > 0) {
      setVoices(availableVoices);
      speech.voice = availableVoices[0];
    }
    // initializeSpeech();
  }, []);

  // const handleRateChange = (e) => {
  //   console.log("rate value: ", e.target.value);
  //   setRate(e.target.value);
  //   speech.rate = e.target.value;
  //   initializeSpeech();
  // };

  // const handleVolumeChange = (e) => {
  //   console.log("volume value: ", e.target.value);
  //   setVolume(e.target.value);
  //   speech.volume = e.target.value;
  //   initializeSpeech();
  // };

  // const handlePitchChange = (e) => {
  //   console.log("pitch value: ", e.target.value);
  //   setPitch(e.target.value);
  //   speech.pitch = e.target.value;
  //   initializeSpeech();
  // };

  const handleVoiceChange = (e) => {
    speech.voice = voices[e.target.value];
    console.log("voice: ", voices[e.target.value]);
  };

  const handleStart = () => {
    speech.text = message ? message : "Please type something to speak";
    window.speechSynthesis.speak(speech);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
  };

  const handleResume = () => {
    window.speechSynthesis.resume();
  };

  const handleCancel = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <p className="lead text-light mt-4 fs-3">Select A Voice</p>

      {/* <!-- Select Menu for Voice --> */}
      <select
        id="voices"
        className="form-select bg-secondary text-light w-50"
        onChange={handleVoiceChange}>
        {setAvailableVoices()}
      </select>

      {/* <!-- Range Sliders for Volume, Rate & Pitch --> */}
      {/* <div className="d-flex mt-4 text-light">
        <div>
          <p className="lead">Volume</p>
          <input
            type="range"
            min="0"
            max="1"
            value={volume}
            step="0.1"
            id="volume"
            onChange={handleVolumeChange}
          />
          <span id="volume-label" className="ms-2">
            {volume}
          </span>
        </div>
        <div className="mx-5">
          <p className="lead">Rate</p>
          <input
            type="range"
            min="0.1"
            max="10"
            value={rate}
            id="rate"
            step="0.1"
            onChange={handleRateChange}
          />
          <span id="rate-label" className="ms-2">
            {rate}
          </span>
        </div>
        <div>
          <p className="lead">Pitch</p>
          <input
            type="range"
            min="0"
            max="2"
            value={pitch}
            step="0.1"
            id="pitch"
            onChange={handlePitchChange}
          />
          <span id="pitch-label" className="ms-2">
            {pitch}
          </span>
        </div>
      </div> */}

      {/* <!-- Text Area  for the User to Type --> */}
      {/* <textarea
        className="form-control bg-dark text-light mt-5"
        cols="30"
        rows="10"
        placeholder="Type here..."></textarea> */}

      {/* <!-- Control Buttons --> */}
      <div className="mb-5">
        <button
          id="start"
          className="btn btn-success mt-5 me-3"
          onClick={handleStart}>
          Start
        </button>
        <button
          id="pause"
          className="btn btn-warning mt-5 me-3"
          onClick={handlePause}>
          Pause
        </button>
        <button
          id="resume"
          className="btn btn-info mt-5 me-3"
          onClick={handleResume}>
          Resume
        </button>
        <button
          id="cancel"
          className="btn btn-danger mt-5 me-3"
          onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
