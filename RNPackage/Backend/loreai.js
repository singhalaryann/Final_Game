import axios from "axios";

const baseUrl = "http://127.0.0.1:5001";

// Function to fetch story from backend
export const fetchStory = async (storyId) => {
    try {
        const response = await axios.post(baseUrl + '/fetch_story', { story_id: storyId });
        return response.data;
    } catch (error) {
        console.error('Error fetching story:', error.response ? error.response.data : error.message);
    }
};

export const generateFirstEps = async (storyJson, genre, storyOutline) => {
    try {
        const response = await axios.post(baseUrl + '/get_first_eps', {
            story_json: storyJson,
            genre: genre,
            story_outline: storyOutline
        });
        return response.data;
    } catch (error) {
        console.error('Error generating first episode:', error.response ? error.response.data : error.message);
    }
};

export const generateCards = async (storyJson, agentName, episodeNumber) => {
    try {
        const response = await axios.post(baseUrl + '/get_card', {
            story_json: storyJson,
            agent_name: agentName,
            episode_number: episodeNumber
        });
        return response.data;
    } catch (error) {
        console.error('Error generating cards:', error.response ? error.response.data : error.message);
    }
};

export const generateNextEps = async (storyJson, episodeNumber) => {
    try {
        const response = await axios.post(baseUrl + '/get_next_eps', {
            story_json: storyJson,
            episode_number: episodeNumber
        });
        return response.data;
    } catch (error) {
        console.error('Error generating next episode:', error.response ? error.response.data : error.message);
    }
};

export const progressStory = async (storyJson, episodeNumber) => {
    try {
        const response = await axios.post(baseUrl + '/progress_story', {
            story_json: storyJson,
            episode_number: episodeNumber
        });
        return response.data;
    } catch (error) {
        console.error('Error progressing story:', error.response ? error.response.data : error.message);
    }
};
