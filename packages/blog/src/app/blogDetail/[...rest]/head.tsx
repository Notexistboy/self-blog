import dayjs from 'dayjs';
import Link from 'next/link';

// import data from '@blog/communication';
import { FC, Suspense } from 'react';
import { CopyIcon } from './client';

interface Props {
  current: IssuerData;
}

interface IssuerData {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  labels: {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: false;
    description: string;
  }[];
  state: string;
  locked: false;
  assignee: null;
  assignees: [];
  milestone: null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: null;
  author_association: string;
  active_lock_reason: null;
  body: string;
  reactions: {
    url: 'https://api.github.com/repos/bosens-China/blog/issues/101/reactions';
    total_count: 0;
    '+1': 0;
    '-1': 0;
    laugh: 0;
    hooray: 0;
    confused: 0;
    heart: 0;
    rocket: 0;
    eyes: 0;
  };
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null;
}

export const Head: FC<Props> = ({ current }) => {
  return (
    <>
      <h1>{current.title}</h1>
      <ul uk-margin="">
        <li>
          <Suspense
            fallback={
              <a>
                <i />
              </a>
            }>
            <CopyIcon></CopyIcon>
          </Suspense>

          {current.labels.map(f => {
            return (
              <Link key={f.id} href={`/types/${f.id}`}>
                {f.name}
              </Link>
            );
          })}
        </li>
        <li>
          <span title={`文章创建时间：${dayjs(current.created_at).format(`YYYY-MM-DD`)}`}>
            <i /> {dayjs(current.updated_at).format(`YYYY-MM-DD`)}
          </span>
        </li>
        <li>
          <span>
            <i />
            <span suppressHydrationWarning>0</span>次
          </span>
        </li>
      </ul>
    </>
  );
};
