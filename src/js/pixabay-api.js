import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function searchingRequest(params) {
  try {
    const response = await axios.get('', { params });
    return response.data;
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: `Failed to fetch data: ${error.message}`,
    });
    throw error;
  }
}
