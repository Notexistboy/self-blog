import { Skeleton } from 'antd';

interface Props {
  title?: string;
}

export default function Loading({ title }: Props) {
  return (
    <div>
      <div>
        <div>
          <div>{title}</div>
        </div>
        <div>
          <Skeleton active />
        </div>
      </div>
    </div>
  );
}
