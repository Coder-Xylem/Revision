import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  
});

// Tweet related API calls
export const getTweets = async () => {
  try {
    const response = await api.get('/tweets');
    return response.data;
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw error;
  }
};

export const getTweetById = async (id) => {
  try {
    const response = await api.get(`/tweets/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tweet with id ${id}:`, error);
    throw error;
  }
};

export const createTweet = async (tweetData) => {
  try {
    const response = await api.post('/tweets', tweetData);
    return response.data;
  } catch (error) {
    console.error('Error creating tweet:', error);
    throw error;
  }
};

export const likeTweet = async (id) => {
  try {
    const response = await api.post(`/tweets/like/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error liking tweet with id ${id}:`, error);
    throw error;
  }
};

export const dislikeTweet = async (id) => {
  try {
    const response = await api.post(`/tweets/dislike/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error disliking tweet with id ${id}:`, error);
    throw error;
  }
};

export default api;