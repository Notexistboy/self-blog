// import './styles.scss';
// import Page from './pages/page/[page]';
// import { redirect } from "next/navigation";
import Link from 'next/link';
import Introduce from './introduce';

export default function Home() {
  return (
    <>
      <Introduce />
      <Link href={`/blogs/1`}>blog</Link>
    </>
  );
  // return redirect("page/1");
}
