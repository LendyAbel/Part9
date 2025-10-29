import axios from 'axios';
import type { NewDiaryEntry, DiaryEntry, NonSensitiveDiaryEntry } from '../types';
const baseUrl = '/api/diaries';

const getAllEntries = () => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then(res => res.data);
};

const createEntry = (newEntry: NewDiaryEntry) => {
  return axios.post<DiaryEntry>(baseUrl, newEntry).then(res => res.data);
};

export default { getAllEntries, createEntry };
