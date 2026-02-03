const OurValuesSection = () => {
  return (
    <section className="flex flex-col justify-center items-end gap-[60px] p-[100px] self-stretch bg-[lightGray]">
      <div className="flex items-start gap-8">
        <div className="w-96 h-48 bg-white/20">
          <img src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/value/1.png"></img>
        </div>
        <div className="w-96 h-96 bg-white/20">
          <img src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/value/2.png"></img>
        </div>
      </div>
      <div className="flex flex-col items-start gap-[40px]">
        <div className="justify-start text-neutral-900/80 text-[40px] font-normal font-sogang leading-[48px]">
          Our Values
        </div>
        <div className="inline-grid gap-8 grid-rows-[repeat(2,fit-content(100%))] grid-cols-[repeat(2,fit-content(100%))]">
          <div className="w-96 h-48 py-9 bg-white inline-flex flex-col justify-start items-center gap-3">
            <div className="text-center justify-start text-red-700 text-xl font-normal font-sogang leading-7">
              (01)
            </div>
            <div className="flex flex-col justify-start items-center gap-1">
              <div className="w-64 text-center justify-start text-neutral-900/80 text-base font-normal font-['Pretendard'] leading-6">
                매주 월·수 19시 Lion Sprint에
                <br />
                온전히 몰입할 수 있는 분
              </div>
              <div className="justify-start text-neutral-900/60 text-base font-normal font-['Pretendard'] leading-6">
                * 시험기간 제외{" "}
              </div>
            </div>
          </div>
          <div className="w-96 h-48 py-9 bg-white inline-flex flex-col justify-start items-center gap-3">
            <div className="text-center justify-start text-red-700 text-xl font-normal font-sogang leading-7">
              (02)
            </div>
            <div className="text-center justify-start text-neutral-900/80 text-base font-normal font-['Pretendard'] leading-6">
              모르는 것을 스스로 찾아 학습하며
              <br />
              개발자로서의 성장을
              <br />
              주도적으로 즐기는 분
            </div>
          </div>
          <div className="w-96 h-48 py-9 bg-white inline-flex flex-col justify-start items-center gap-3">
            <div className="text-center justify-start text-red-700 text-xl font-normal font-sogang leading-7">
              (03)
            </div>
            <div className="text-center justify-start text-neutral-900/80 text-base font-normal font-['Pretendard'] leading-6">
              팀원과 협업하며 지식을 나누고
              <br />
              끝까지 책임감을 갖고
              <br />
              결과물을 완성하는 분
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValuesSection;
