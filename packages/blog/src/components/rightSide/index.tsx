import Link from 'next/link';
import data, { classification } from '@blog/communication';
import './index.scss';

export default function RightSide() {
  const recnetly = data.issuesData.slice(0, 5);

  return (
    <div className="rightSide">
      <div>
        <ul>
          <li>
            <h4>分类查看</h4>
            <ul>
              {data.label.map(item => {
                const length = classification.get(`${item.id}`)?.length || 0;
                return (
                  <li key={item.id}>
                    <Link href={`/blogClassify/${item.id}`} title={item.description}>
                      {item.name}
                      <span>[{length}]</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <div>
              <h4>近期文章</h4>
              <ul>
                {recnetly.map(item => {
                  return (
                    <li key={item.id}>
                      <Link href={`/details/${item.id}`}>{item.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
