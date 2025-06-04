import axios from "axios";

const get = async (url) => {
  try {
    const response = await axios.get(url); 
    return response.data; 
  } catch (error) {
    console.error('Failed to fetch tourist places:', error);
    throw error; 
  }
};

export { get };
