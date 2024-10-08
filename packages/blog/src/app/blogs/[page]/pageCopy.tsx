'use client';
import { Content } from '@/components/content';
import type data from '@blog/communication';
import { Props as PageNumberProps } from '@/components/content/pageNumber';
import { PAGETOTAL } from '@/constants/constant';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

interface Props {
  data: typeof data;
  page: number;
}

export function PageCopy({ data, page }: Props) {
  const searchParams = useSearchParams();
  const search = searchParams.get('s');

  const filteredData = useMemo(() => {
    if (!search) {
      return data.issuesData;
    }

    return data.issuesData.filter(f => new RegExp(search, 'i').test(f.title));
  }, [data.issuesData, search]);

  const pageData = useMemo(() => {
    return Math.ceil(filteredData.length / PAGETOTAL);
  }, [filteredData]);

  const obj: PageNumberProps = {
    pagingData: Array.from({ length: pageData }).map((item, index) => {
      return {
        page: index + 1,
        label: `${index + 1}`,
        url: `/page/${index + 1}`,
      };
    }),
    page: +page,
  };
  const currentData = filteredData.slice((+page - 1) * PAGETOTAL, +page * PAGETOTAL);

  return <Content data={data} title="最新文章" currentData={currentData} {...obj} s={search || ''}></Content>;
}
