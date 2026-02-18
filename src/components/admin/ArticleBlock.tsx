type answerType = {
  questionId: number;
  content: string;
};

type articleProps = {
  question: string;
  answer?: answerType;
  num: number;
};

const ArticleBlock = ({ question, answer, num }: articleProps) => {
  if (num === 4) {
    return (
      <div className="w-[800px] flex flex-col font-[350] font-sans">
        <div className="flex w-full text-[20px]/[140%] text-black/80">
          <h2 className="font-[550]">{question}</h2>
        </div>
        <div
          className={`flex px-[20px]  py-[10px] text-[16px]/[160%] text-black bg-lightGray rounded-[12px] mt-[20px] ${
            !answer?.content ? "text-black/60" : ""
          }`}
        >
          {!answer?.content ? "미입력" : answer?.content}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-[800px] flex flex-col font-[550] font-sans">
        <div className="flex w-full text-[20px]/[140%] text-black/80">
          <h2>{num + 1}.&nbsp;</h2>
          <h2>{question}</h2>
        </div>

        <div className="flex px-[20px] py-[15px] h-[240px] text-[16px]/[160%] text-black bg-lightGray rounded-[12px] mt-[20px]">
          {answer?.content}
        </div>
        <div className="w-full flex justify-end text-[16px] text-black/60 mt-[4px]">
          {answer?.content?.length ?? 0} / 500
        </div>
      </div>
    );
  }
};

export default ArticleBlock;
