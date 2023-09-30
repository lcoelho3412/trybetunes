
const billboard = async () => {
  
  const url = 'https://billboard-api2.p.rapidapi.com/artist-100?date=2019-05-11&range=1-10';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd292ce7dbcmsh245c0aaedd8478ep1756e8jsn67c57ba81172',
      'X-RapidAPI-Host': 'billboard-api2.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    
    
  // Get a random index between 1 and 10
  const randomIndex = Math.floor(Math.random() * 10) + 1;

  // Retrieve the artist's name using the random index
  const artistName = result.content[randomIndex].artist;

  return artistName;

  } catch (error) {
    console.error(error);
  }

}

export default billboard;