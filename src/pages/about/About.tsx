import ActivityList from "../../components/about/ActivityList";
import ArchiveList from "../../components/about/ArchiveList";
import PositionCard from "../../components/common/PositionCard";

const About = () => {
  return (
    <div>
      {/********************************************  Intro  *********************************************/}
      <section
        data-header="dark"
        className="flex p-[100px] flex-col justify-center items-start gap-[40px] self-stretch"
      >
        <div className="absolute left-0 pointer-events-none w-[468px] h-[323px] top-[255px] aspect-[468/323]">
          <img
            className="relative w-full h-full object-cover"
            src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/bg.png"
            alt="likelion-sogang-bg"
          />
        </div>

        <div className="flex flex-col items-end gap-[20px] self-stretch">
          <img
            src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/1.png"
            alt="about/1"
          />
          <div className="flex items-start gap-[20px]">
            <img
              src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/2.png"
              alt="about/2"
            />
            <img
              src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/3.png"
              alt="about/3"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-[40px] self-stretch">
          <div className="self-stretch text-sogang/100 font-sogang text-[64px] font-normal leading-[120%] ">
            Possibility <a className="text-black/60">(to)</a> Reality
          </div>
          <div className="text-black/80 font-pretendard text-[20px] font-normal self-stretch leading-[140%]">
            <p className="inline text-black font-semibold">
              (서강대학교 멋쟁이사자처럼)
            </p>
            <span>은</span>
            <br className="hidden md:block" />
            각자의 관심과 시도를 바탕으로 함께 만들고 배우는 IT 창업
            동아리입니다.
            <br className="hidden md:block" />
            <br />
            프로젝트와 해커톤을 통해 아이디어를 직접 구현해 보고,
            <br className="hidden md:block" />
            협업 속에서 하나의 서비스를 완성해 가는 과정을 경험합니다.
            <br className="hidden md:block" />
            또한 다양한 교류와 네트워킹을 통해 학교 밖의 시도들과 연결되며
            시야를 넓혀갑니다.
            <br className="hidden md:block" />
            <br />
            아이디어를 현실로 옮기는 경험을 통해 성장해 나가는 여정에
            <br className="hidden md:block" />
            서강대학교 멋쟁이사자처럼이 함께합니다.
          </div>
        </div>
      </section>

      {/********************************************  Activities  *********************************************/}
      <section className="flex p-[100px_0px] flex-col justify-center items-center gap-[40px] self-stretch">
        <div className="text-black/80 text-center font-sogang text-[32px] font-normal leading-[120%]">
          Activities
        </div>
        <ActivityList />
      </section>

      {/********************************************  Positions  *********************************************/}
      <section className="flex p-[100px_120px] flex-col justify-center items-center gap-[40px] self-stretch bg-lightGray">
        <div className="font-sogang text-black/80 text-center text-[32px] font-normal leading-[120%]">
          Positions
        </div>
        <div className="grid grid-cols-3 gap-[24px]">
          <PositionCard
            title="Backend"
            description="데이터를 처리하고 비즈니스 로직을 설계하며, 서버 환경을 구축하고 관리합니다."
            imageUrl="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Recruit/BE.png"
            link="https://example.com/BEnotion"
          />

          <PositionCard
            title="Frontend"
            description="사용자와 직접 상호작용하는 인터페이스를 구현하고, 서버와 연동해 동적 웹사이트를 개발합니다."
            imageUrl="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Recruit/FE.png"
            link="https://example.com/FEnotion"
          />

          <PositionCard
            title="Product Design"
            description="사용자의 문제를 정의하고 서비스 전략부터 구조와 UI를 설계해 실제 시장에서 작동하는 제품으로 시각화합니다."
            imageUrl="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Recruit/DE.png"
            link="https://example.com/DEnotion"
          />
        </div>
      </section>

      {/********************************************  Timeline  *********************************************/}
      <section className="flex p-[100px_120px] flex-col justify-center items-center gap-[92px] self-stretch">
        <div className="flex flex-col items-center gap-[20px]">
          <div className="text-black/80 text-center font-sogang text-[32px] font-normal leading-[120%]">
            Program Timeline
          </div>
          <div className="font-pretendard text-[20px] font-normal leading-[140%] text-black/80 text-center">
            정기 일정은 매주 월·수요일 19:00~21:00이며,
            <br className="hidden md:block" /> 모든 활동은 대면으로 진행됩니다.
            단, 운영 상황에 따라 일정 변동이 있을 수 있습니다.
          </div>
        </div>
        <img
          src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/timeline.svg"
          alt="timeline"
        />
      </section>

      {/********************************************  Archive  *********************************************/}
      <section className="flex p-[100px_120px] flex-col justify-center items-center gap-[60px] self-stretch bg-lightGray">
        <div className="flex flex-col items-center gap-[20px]">
          <div className="text-black/80 text-center font-sogang text-[32px] font-normal leading-[120%]">
            Archive
          </div>
          <div className="text-black/80 text-center font-pretendard text-[20px] font-normal leading-[140%]">
            멋쟁이사자처럼 서강대 인스타그램에서 지금까지의 활동들을 만나보세요.
          </div>
        </div>
        <div className="flex justify-center items-center gap-[24px] self-stretch">
          <ArchiveList />
        </div>
      </section>
    </div>
  );
};

export default About;
