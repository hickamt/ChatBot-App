import axios from "axios";

/**
 * This function sends a post request to the server to query the database
 * using the query string 'assets' or 'exchanges'.
 * @param query string literal of query to be sent to server
 * @param {*} setData is a function to set the data returned from the server
 * @param {*} setIsData is a function to set the boolean value of whether data was returned from the server
 * @param {*} setAnimation is a function to set the boolean value of whether the animation should be displayed
 */
async function eleutherAPI(prompt, setMessageHistory, setIsData) {
  try {
    const response = await axios.post("http://localhost:5500/eleuther", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query: prompt,
      },
    });
    // console.log("Client Side Response.Data: ", response.data[0].generated_text);
    if (response && response.data && response.data[0].generated_text) {
    setMessageHistory((prev) => [...prev, prompt, response.data[0].generated_text]);
    setIsData(true);
    }
    // return response.data[0].generated_text;
  } catch (error) {
    console.error(`Error: unable to fetch ${prompt} from the Eleuther Server`, error);
    setMessageHistory((prev) => [...prev, prompt, "That didn't go as planned. Maybe my server is down."])
    setIsData(true);
  }
}

export default eleutherAPI;
