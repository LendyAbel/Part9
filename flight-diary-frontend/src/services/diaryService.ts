import axios from 'axios';
import type { NewDiaryEntry, DiaryEntry, NonSensitiveDiaryEntry } from '../types';
const baseUrl = '/api/diaries';

const getAllEntries = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return response.data;
};


const createEntry = async (newEntry: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, newEntry);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data;
      throw errorMessage;
    } else {
      throw 'Unexpected error';
    }
  }
};

export default { getAllEntries, createEntry };
