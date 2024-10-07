import dayjs from 'dayjs';
import Link from 'next/link';

import data from '@blog/communication';
import { FC, Suspense } from 'react';
import { CopyIcon } from './client';

interface Props {
  current: (typeof data.issuesData)[number];
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
