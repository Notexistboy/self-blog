import { useMemo } from 'react';
import data, { classification } from '@blog/communication';
import Link from 'next/link';
// import { redirect } from "next/navigation";
import NotFound from './not-found';
import { Head } from './head';
import { Article } from '@/components/article';
import './styles.scss';
import { mdToText, textToAbstract } from '@/utils/text';
// import { RelatedReading } from "./relatedReading";
// import { Share } from "./share";
import dynamic from 'next/dynamic';

interface Params {
  rest: [string] | [string, string];
}
interface Props {
  params: Params;
  searchParams: Record<string, string>;
}

// 设置动态标题
export async function generateMetadata({
  params: {
    rest: [id],
  },
}: Props) {
  const current = data.issuesData.find(f => f.id === +id);
  const text = mdToText(current?.body || '');
  const description = textToAbstract(text);

  return {
    title: current?.title,
    description,
  };
}

// export const dynamicParams = true;

export function generateStaticParams() {
  // 返回两次即可
  const result: Params[] = [];
  classification.forEach((value, key) => {
    value.forEach(item => {
      result.push({
        rest: [`${item.id}`, key],
      });
    });
  });
  // 把整个问题遍历一遍
  data.issuesData.forEach(item => {
    result.push({
      rest: [`${item.id}`],
    });
  });

  return result;
}

const Topmodule = dynamic(() => import('../../../components/top'), {
  ssr: false,
});

export default function Page({
  params: {
    rest: [id, typeId],
  },
}: Props) {
  const current = useMemo(() => {
    return data.issuesData.find(f => f.id === +id);
  }, [id]);

  // 确定筛选范围
  const classifiedData = useMemo(() => {
    const arr = typeId ? Array.from(classification.get(typeId) || []) : data.issuesData;
    const index = arr.findIndex(f => f.id === +id);
    const first = index <= 0 ? undefined : arr[index - 1];
    const last = arr[index + 1];
    return {
      first,
      last,
    };
  }, [id, typeId]);
  if (!current) {
    return <NotFound></NotFound>;
  }

  return (
    <>
      <div>
        <div>
          <div>
            <article>
              <Head current={current}></Head>
              <hr />
              <div>
                <Article md={current.body || ''}></Article>
              </div>
            </article>
            {/* <Share></Share> */}
            <div>
              <div uk-grid="">
                <div>
                  {classifiedData.first && (
                    <Link href={'/details/' + [classifiedData.first.id, typeId].filter(f => f).join('/')}>
                      <span>上一篇</span>
                      <div>{classifiedData.first.title}</div>
                    </Link>
                  )}
                </div>
                <div>
                  {classifiedData.last && (
                    <Link href={'/details/' + [classifiedData.last.id, typeId].filter(f => f).join('/')}>
                      <span>下一篇</span>
                      <div>{classifiedData.last.title}</div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <RelatedReading></RelatedReading> */}
      </div>
      <Topmodule></Topmodule>
    </>
  );
}
