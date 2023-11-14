import React, { useState, useEffect } from "react";

const SpeechToText = () => {
  const [speech, setSpeech] = useState(new SpeechSynthesisUtterance());
  const [voices, setVoices] = useState([]);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [text, setText] = useState(
    "Testing the ability to convert text to speech"
  );

  useEffect(() => {
    speech.lang = "en";
    window.speechSynthesis.onvoiceschanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      speech.voice = availableVoices[0];
    };
  }, []);

  const handleRateChange = (e) => {
    setRate(e.target.value);
    speech.rate = e.target.value;
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    speech.volume = e.target.value;
  };

  const handlePitchChange = (e) => {
    setPitch(e.target.value);
    speech.pitch = e.target.value;
  };

  const handleVoiceChange = (e) => {
    speech.voice = voices[e.target.value];
  };

  const handleStart = () => {
    speech.text = text;
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
    <div>
      <p class="lead text-light mt-4">Select Voice</p>

      {/* <!-- Select Menu for Voice --> */}
      <select
        id="voices"
        class="form-select bg-secondary text-light"
        onChange={handleVoiceChange}></select>

      {/* <!-- Range Slliders for Volume, Rate & Pitch --> */}
      <div class="d-flex mt-4 text-light">
        <div>
          <p class="lead">Volume</p>
          <input
            type="range"
            min="0"
            max="1"
            value="1"
            step="0.1"
            id="volume"
            onChange={handleVolumeChange}
          />
          <span id="volume-label" class="ms-2">
            1
          </span>
        </div>
        <div class="mx-5">
          <p class="lead">Rate</p>
          <input
            type="range"
            min="0.1"
            max="10"
            value="1"
            id="rate"
            step="0.1"
            onChange={handleRateChange}
          />
          <span id="rate-label" class="ms-2">
            1
          </span>
        </div>
        <div>
          <p class="lead">Pitch</p>
          <input
            type="range"
            min="0"
            max="2"
            value="1"
            step="0.1"
            id="pitch"
            onChange={handlePitchChange}
          />
          <span id="pitch-label" class="ms-2">
            1
          </span>
        </div>
      </div>

      {/* <!-- Text Area  for the User to Type --> */}
      <textarea
        class="form-control bg-dark text-light mt-5"
        cols="30"
        rows="10"
        placeholder="Type here..."></textarea>

      {/* <!-- Control Buttons --> */}
      <div class="mb-5">
        <button
          id="start"
          class="btn btn-success mt-5 me-3"
          onClick={handleStart}>
          Start
        </button>
        <button
          id="pause"
          class="btn btn-warning mt-5 me-3"
          onClick={handlePause}>
          Pause
        </button>
        <button
          id="resume"
          class="btn btn-info mt-5 me-3"
          onClick={handleResume}>
          Resume
        </button>
        <button
          id="cancel"
          class="btn btn-danger mt-5 me-3"
          onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
