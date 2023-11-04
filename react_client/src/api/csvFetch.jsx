
export const csvFetch = async function fetchCSVFilesFromLocalDirectory(fileName) {
  try {
   return await fetch(fileName)
   .then (response => {return response.text()})
  } catch (error) {
    console.error(error.message, error) 
    return null;
  }
}