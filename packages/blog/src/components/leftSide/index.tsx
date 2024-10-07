'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Drawer, Input } from 'antd';
import type { DrawerClassNames } from 'antd/es/drawer/DrawerPanel';
import { AlignLeftOutlined } from '@ant-design/icons';
import data from '@blog/communication';

import { iconLists } from '@/constants/constant';
import './index.scss';

const menu = [
  {
    url: '/',
    title: '首页',
  },
  {
    url: '/blogs/1',
    pharma: /blogs\/\d+/,
    title: '随记',
  },
];

export default function LeftSide() {
  const { NEXT_PUBLIC_GITHUB_REPOSITORY } = process.env;

  const [unfold, setUnfold] = useState(false);

  const classNames: DrawerClassNames = {
    content: 'sider-drawer',
  };
  const pathname = usePathname();

  return (
    <div className="leftSide">
      <div>
        <AlignLeftOutlined onClick={() => setUnfold(true)} />
      </div>
      <Drawer
        classNames={classNames}
        closeIcon={false}
        placement="left"
        width={'auto'}
        onClose={() => setUnfold(false)}
        open={unfold}
        footer={null}
        title={null}
        styles={{
          body: {
            padding: '12px',
          },
        }}>
        <div>
          <div style={{ width: '180px' }}>
            <div>
              <div>
                <Link href="/">
                  <Image alt="user" width={100} height={100} src={data?.user?.avatar_url} />
                </Link>
                <h1>
                  <Link href="/"> {data?.user?.name} </Link>
                </h1>
                <p>{data?.user?.bio}</p>
              </div>
              <ul>
                {iconLists.map(item => {
                  return (
                    <li key={item.url}>
                      <a href={item.url} target="_blank" title={item.alt}>
                        <Image alt="" src={item.icon} width={20} height={20}></Image>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <ul>
                {menu.map(item => {
                  return (
                    <li
                      key={item.title}
                      className={
                        [item.url, item.pharma].find(f => {
                          if (f instanceof RegExp) {
                            return f.test(pathname);
                          }
                          return f === pathname;
                        })
                          ? ''
                          : ''
                      }>
                      <Link href={item.url}>{item.title}</Link>
                    </li>
                  );
                })}
              </ul>
              <form method="get" action={`${process.env.NEXT_PUBLIC_BASE_PATH}/page/1`}>
                <Input type="search" name="s" placeholder="搜索" defaultValue="" />
              </form>
            </div>
            <a href={`https://github.com/${NEXT_PUBLIC_GITHUB_REPOSITORY}`} target="_blank">
              {NEXT_PUBLIC_GITHUB_REPOSITORY}
            </a>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
