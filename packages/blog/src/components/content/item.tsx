import { FC, useMemo } from 'react';
import { default as UserData } from '@blog/communication';
import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';
import './styles.scss';
import { extractImgTags, mdToText, textToAbstract } from '@/utils/text';

export type TitleJumpPath = string;

type Props = (typeof UserData.issuesData)[number] & {
  jumpPath?: TitleJumpPath;
  // 搜索参数
  s?: string;
};

export const Item: FC<Props> = ({ body, s, labels: type, updated_at, id, jumpPath, title }) => {
  const text = mdToText(body || '');
  const imgAll = extractImgTags(body || '');

  const time = dayjs(updated_at || '').format('YYYY-MM-DD');

  const content = useMemo(() => {
    const total = imgAll.length <= 1 ? 100 : 70;
    const t = textToAbstract(text, total);
    return t !== text ? t + '......' : t;
  }, [imgAll.length, text]);

  const path = useMemo(() => {
    if (!jumpPath) {
      return `/blogDetail/${id}`;
    }
    return jumpPath.replace(/<ARTICLE_ID>/g, `${id}`);
  }, [id, jumpPath]);

  const ItemTitle = (
    <h2>
      <Link
        href={path}
        dangerouslySetInnerHTML={{
          __html: s
            ? title.replace(new RegExp(s, 'ig'), (value: string) => {
                return `<span style="color: red">${value}</span>`;
              })
            : title,
        }}></Link>
    </h2>
  );

  if (!imgAll.length) {
    return (
      <li uk-grid="">
        <div>
          <div>
            <div>
              {ItemTitle}
              <p>{content}</p>
            </div>
            <div>
              {type.map(item => {
                return (
                  <Link href={`/types/${item.id}`} key={item.id}>
                    {item.name}
                  </Link>
                );
              })}

              <time>{time}</time>
            </div>
          </div>
        </div>
      </li>
    );
  }
  if (imgAll.length === 1) {
    return (
      <li uk-grid="">
        <div>
          <div>
            <div>
              {ItemTitle}
              <p>{content}</p>
            </div>
            <div>
              {type.map(item => {
                return (
                  <Link href={`/types/${item.id}`} key={item.id}>
                    {item.name}
                  </Link>
                );
              })}

              <time>{time}</time>
            </div>
          </div>
        </div>
        <div>
          <Link
            href={`/blogDetail/${id}`}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            uk-img="">
            <Image
              width={200}
              height={100}
              style={{
                width: '100%',
                height: 'auto',
              }}
              src={imgAll[0]}
              alt={imgAll[0]}></Image>
          </Link>
        </div>
      </li>
    );
  }

  return (
    <li uk-grid="">
      <div>
        <div>
          <div>
            {ItemTitle}
            <p>{content}</p>
          </div>
        </div>
      </div>
      <div>
        <div uk-grid="">
          {imgAll.slice(0, 3).map((item, index) => {
            return (
              <div className={!index ? 'uk-first-column' : ''} key={item + index}>
                <Link href={`/blogDetail/${id}`} uk-img="">
                  <Image
                    width={200}
                    data-img={item}
                    height={130}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                    src={item}
                    alt={item}></Image>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div>
          {type.map(item => {
            return (
              <Link href={`/types/${item.id}`} key={item.id}>
                {item.name}
              </Link>
            );
          })}

          <time>{time}</time>
        </div>
      </div>
    </li>
  );
};
