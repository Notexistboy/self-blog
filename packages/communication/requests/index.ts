import axios from 'axios';
const { AUTHORIZATION } = process.env;

export const request = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 10000,
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${AUTHORIZATION}`,
    'X-GitHub-Api-Version': '2022-11-28',
  },
});
