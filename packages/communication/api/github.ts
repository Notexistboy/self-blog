import { request } from '../requests';
import { IssuesDaum, Label, User2 } from '../types';

const { GITHUB_REPOSITORY } = process.env;

export const issues = async (page = 1) => {
  const { data } = await request.get<IssuesDaum[]>(`/repos/${GITHUB_REPOSITORY}/issues`, {
    params: {
      filter: 'created',
      state: 'open',
      sort: 'updated',
      per_page: 100,
      page,
    },
  });
  return data;
};

export const labels = async (page = 1) => {
  const { data } = await request.get<Label[]>(`/repos/${GITHUB_REPOSITORY}/labels`, {
    params: {
      per_page: 100,
      page,
    },
  });
  return data;
};
export const user = async () => {
  const { data } = await request.get<User2>(`/user`);
  return data;
};
