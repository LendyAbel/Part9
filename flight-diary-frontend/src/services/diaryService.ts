import axios from 'axios';
import type { DiaryEntry } from '../types';
const baseUrl = 'http://localhost:3000/api/diaries';

const getAllEntries = () => {
    return axios.get<DiaryEntry[]>(baseUrl).then(res => res.data)
}

export default { getAllEntries}