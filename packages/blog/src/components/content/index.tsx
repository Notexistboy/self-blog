import { FC } from 'react';
import { PageNumber, Props as PageNumberProps } from './pageNumber';
import { default as UserData } from '@blog/communication';
import { Item, TitleJumpPath } from './item';
import { Empty } from 'antd';

type Props = {
  // 当前页数
  page: number;
  // 标题
  title: string;
  // 页面当前展示数据
  currentData: typeof UserData.issuesData;
  data: typeof UserData;
  // 跳转链接路由格式
  jumpPath?: TitleJumpPath;
  // 搜索参数
  s?: string;
} & PageNumberProps;

export const Content: FC<Props> = ({ page = 1, title, currentData, jumpPath, pagingData, s }) => {
  return (
    <div>
      <div>
        <div>
          <div>{title || '最新文章'}</div>
        </div>
        <div>
          {!currentData.length && <Empty />}
          <ul>
            {currentData.map(item => {
              return <Item s={s} key={item.id} {...item} jumpPath={jumpPath}></Item>;
            })}
          </ul>
        </div>
      </div>
      {pagingData.length >= 2 && <PageNumber pagingData={pagingData} page={page}></PageNumber>}
    </div>
  );
};
