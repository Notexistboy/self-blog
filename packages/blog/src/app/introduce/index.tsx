import './index.scss';
// import { useState } from "react";

export default function Introduce() {
  // const { NEXT_PUBLIC_GITHUB_REPOSITORY } = process.env;
  // console.log('data', data);
  return (
    <div className="introduce">
      <div className="introduce-title">who am i?</div>
      <div className="introduce-info">前端练习生,联系时长四年半</div>
      <div>
        爱好
        <div>滑雪 一顺刻滑 工资赞助滑手</div>
        <div>飞机 八卦台留守人员</div>
        <div>摄影 纯装备党A7M4➕2470GM2 720GM2</div>
      </div>
      <div>
        开始写博客的原因
        <div>工作这么久,感觉自己的能力已经很久都没有进步了</div>
        <div>沉淀总结一下学过的和一些有心得的知识点</div>
        <div>同时也希望自己能geek一点</div>
      </div>
    </div>
  );
}
