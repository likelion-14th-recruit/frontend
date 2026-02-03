import IntroSection from "../../components/home/IntroSection";
import ExperienceItem from "../../components/home/ExperienceItem";
import FAQItem from "../../components/recruit-home/FAQItem";
import ProgramSection from "../../components/home/ProgramSection";
import ProjectSection from "../../components/home/ProjectSection";
import OurValuesSection from "../../components/home/OurValuesSection";
import FAQList from "../../components/recruit-home/FAQList";

const ExperiencesData = [
  {
    track: "( Backend Part )",
    content:
      "혼자 시작했다면 많이 막막했을 것 같은데, 초보자도 체계적으로 배울 수 있도록 도와줘서 멋진 개발자로 성장할 수 있는 환경입니다. 또한 개발에 열정적인 사람들이 모여 있어 함께 프로젝트를 시작하고 도전하기에 정말 좋은 분위기라고 느꼈습니다.",
  },
  {
    track: "( Frontend Part )",
    content:
      "개발에 대해 잘 모르는 상태로 시작했지만, 멋사에서 다양한 프로젝트를 하며 개발 뿐만 아니라 협업하는 법 등 많은 것을 배울 수 있었습니다.",
  },
  {
    track: "( Frontend Part )",
    content:
      "개발을 처음 해보는 입장이었는데 세션별로 수업이 있어서 차근차근 따라오기 좋았습니다. 또 직접 백,프론트,디자인과의 팀을 만들어 협업, 기획부터 배포 운영까지 전 과정을 겪을 수 있어서 좋았습니다.",
  },
  {
    track: "( Design Part )",
    content:
      "기존에 알고 있던 UX/UI 디자인 지식에서 부족한 부분을 세션으로 통해 배울 수 있었고 이를 해커톤, 데모데이와 같은 협업 활동에 잘 녹여낼 수 있었던 경험이었습니다.",
  },
  {
    track: "( Design Part )",
    content:
      "Figma 기초부터 실제 개발 프로젝트의 디자인을 전담하며, 디자인의 심미성과 사용성을 동시에 고려하는 경험을 할 수 있었습니다. 단순히 화면을 예쁘게 만드는 것을 넘어, 사용자 관점에서 문제를 정의하고 이를 구조적으로 해결하는 디자인 과정을 직접 고민해볼 수 있었습니다.",
  },
  {
    track: "( Backend Part )",
    content:
      "체계적인 커리큘럼 및 다양한 프로젝트를 통해 1년간 큰 성장을 이룰 수 있었습니다.",
  },
  {
    track: "( Backend Part )",
    content:
      "멋진 동료들 덕분에 즐겁게 개발하며 앞으로의 진로에 대한 확신을 얻는 시간이 되었습니다.",
  },
];

const faqList: FAQ[] = [
  {
    question: "멋쟁이사자처럼 공식 활동은 언제인가요?",
    answer:
      "멋쟁이사자처럼은 1학기 동안 월·수 오후 7시~9시 정기 교육 세션을 통해 각 파트별 교육을 받게 됩니다. 이후 아이디어톤, 해커톤, 데모데이 등 다양한 프로젝트 경험을 통해 실전 중심의 개발 역량을 기르실 수 있습니다. 활동 특성상 매주 정기적인 참여가 어려운 경우 최종 선발이 어려울 수 있으니, 지원 전 개인 일정 및 학업 병행 가능 여부를 충분히 고려해 주시기 바랍니다.",
  },
  {
    question: "2학기에도 리크루팅을 진행하나요?",
    answer:
      "멋쟁이사자처럼의 최소 활동 단위는 1년(두 학기 연속 활동)으로, 리크루팅은 1학기에만 진행됩니다. 2학기에는 기존 기수원들이 데모데이에 집중하는 기간으로, 추가 모집은 진행하지 않으니 지원 시기를 꼭 확인해 주세요.",
  },
  {
    question: "동아리 참여에 학년 제한이 있나요?",
    answer:
      "멋쟁이사자처럼 서강대학교는 학년이나 재학/휴학 여부와 관계없이 모든 서강대 학우분들께 열려 있습니다. 1년 동안 열정적이고 성실하게 활동하실 준비가 된 분이라면 누구든 환영합니다!",
  },
  {
    question: "트랙간 중복지원이 가능한가요?",
    answer:
      "멋쟁이사자처럼의 최소 활동 단위는 1년(두 학기 연속 활동)으로, 리크루팅은 1학기에만 진행됩니다. 2학기에는 기존 기수원들이 데모데이에 집중하는 기간으로, 추가 모집은 진행하지 않으니 지원 시기를 꼭 확인해 주세요.",
  },
  {
    question: "면접은 어떻게 진행되나요?",
    answer:
      "14기 아기사자 면접은 대면으로 진행됩니다. 서류 합격자에 한해 면접 일시와 장소를 개별 안내드릴 예정입니다.",
  },
  {
    question: "동아리 관련 문의는 어디로 하나요?",
    answer:
      "궁금한 점이 있으시면 멋쟁이사자처럼 서강대학교 공식 인스타그램(@likelion_sg) DM으로 편하게 문의해 주세요.",
  },
];

const Home = () => {
  return (
    <div>
      <section data-header="light" className="relative z-0 w-full text-white">
        {/* 1. 배경 이미지: absolute를 제거하고 'relative'로 두어 section의 실제 높이를 결정하게 합니다. */}
        <div className="relative w-full">
          <img
            src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/1.png"
            className="w-full h-auto block object-contain"
            alt="background"
          />
          {/* 어두운 오버레이: 이미지 위에 덮음 */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />

          {/* 2. 글씨 Wrapper: 이미지 영역(inset-0)을 100% 상속받음 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            {/* 발광 효과 (Wrapper 중앙) */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[800px] max-h-[500px] pointer-events-none z-0"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, #121212 0%, rgba(18, 18, 18, 0) 100%)",
              }}
            />

            {/* 3. 글씨 사진 (Title Image) */}
            <img
              src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/title.png"
              className="relative z-10 w-[70%] max-w-[700px] h-auto object-contain mb-[5%] md:mb-10"
              alt="LikeLion Sogang 14th"
            />

            {/* 4. 버튼 */}
            <button
              className="
          relative z-10
          px-[4%] py-[1.5%] md:px-[24px] md:py-[10px]
          rounded-[12px]
          bg-sogang
          text-white
          font-pretendard
          text-[16px] md:text-[20px]
          font-semibold
          leading-[140%]
          transition-transform hover:scale-105
        "
            >
              14기 지원하기
            </button>
          </div>
        </div>
      </section>

      <section data-header="light" className="bg-white h-[1000px]">
        <IntroSection />
        <ProgramSection />
        <ProjectSection />
        <OurValuesSection />
        {/********************************************  Experiences  *********************************************/}
        <section className="flex flex-col justify-center items-center gap-[60px] p-[150px_200px] self-stretch">
          <div className="flex flex-col items-center gap-[4px]">
            <div className="text-black/60 text-center font-pretendard text-[20px] font-semibold leading-[140%]">
              (LikeLion)
            </div>
            <div className="text-black/80 font-sogang text-[40px] font-normal leading-[48px]">
              Experiences
            </div>
          </div>
          <div className="flex items-start gap-[32px]">
            {ExperiencesData.map((data, index) => (
              <ExperienceItem
                key={index}
                track={data.track}
                content={data.content}
              />
            ))}
          </div>
        </section>

        {/********************************************  FAQ  *********************************************/}
        <section className="flex flex-col items-center gap-10 p-[100px_200px] self-stretch">
          <div className="text-black/80 text-center font-sogang text-[40px] font-normal leading-[120%]">
            FAQ
          </div>

          <div className="flex flex-col items-center gap-6 self-stretch">
            <div className="flex flex-col gap-6 self-stretch">
              {faqList.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;
