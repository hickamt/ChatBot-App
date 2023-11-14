import axios from "axios";

/**
 * This function sends a post request to the server to query the database
 * using the query string 'assets' or 'exchanges'.
 * @param query string literal of query to be sent to server
 * @param {*} setData is a function to set the data returned from the server
 * @param {*} setIsData is a function to set the boolean value of whether data was returned from the server
 * @param {*} setAnimation is a function to set the boolean value of whether the animation should be displayed
 */
async function zephyrAPI(prompt, setMessageHistory, setIsData, setTextToSpeech) {
  try {
    const response = await axios.post("http://localhost:5500/zephyr", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query: prompt,
      },
    });
    // console.log("Client Side Response.Data: ", response.data);
    setMessageHistory((prev) => [...prev, prompt, response.data]);
    // setTextToSpeech([...response.data]);
    setIsData(true);
  } catch (error) {
    console.error(
      `Error: unable to fetch prompt: "${prompt}" from the Zephyr Server`,
      error
    );
    setMessageHistory((prev) => [
      ...prev,
      prompt,
      "That didn't go as planned. Maybe my server is down.",
    ]);
    setIsData(true);
  }
}

export default zephyrAPI;
