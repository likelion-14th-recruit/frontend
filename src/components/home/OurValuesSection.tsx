import ValueItem from "./ValueItem";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
// Props 타입 정의
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

type ValueType = {
  id: string;
  content_sm: string;
  content_md: string;
  comment: string;
};

const OurValuesSection = () => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col gap-[24px] md:gap-[60px]"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-start self-stretch gap-[16px] md:gap-[20px] lg:gap-[32px]"
      >
        <div className="flex items-start self-stretch gap-[16px] md:gap-[20px] lg:gap-[32px]">
          {/* 첫 번째 이미지 박스 */}
          <div className="w-[159px] md:w-[288px] lg:w-[360px] aspect-[9/5] shrink-0">
            <img
              className="w-full h-full object-cover"
              src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/value/1.png"
              alt="value 1"
            />
          </div>

          {/* 두 번째 이미지 박스 */}
          <div className="w-[159px] md:w-[288px] lg:w-[360px] aspect-[9/10] shrink-0">
            <img
              className="w-full h-full object-cover"
              src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/value/2.png"
              alt="value 2"
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-start gap-[20px] md:gap-[40px]"
      >
        <div className="justify-start text-neutral-900/80 text-[32px] md:text-[40px] font-normal font-sogang leading-[48px]">
          Our Values
        </div>
        <div className="inline-grid gap-[16px] md:gap-[20px] lg:gap-[32px] grid-rows-[repeat(2,fit-content(100%))] grid-cols-[repeat(2,fit-content(100%))]">
          {valueData.map((value) => (
            <ValueItem
              key={value.id}
              id={value.id}
              content_sm={value.content_sm}
              content_md={value.content_md}
              comment={value.comment}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const valueData: ValueType[] = [
  {
    id: `(01)`,
    content_sm: `매주 월·수 19시
Lion Sprint에 온전히
몰입할 수 있는 분`,
    content_md: `매주 월·수 19시 Lion Sprint에
온전히 몰입할 수 있는 분`,
    comment: `* 시험기간 제외 `,
  },
  {
    id: `(02)`,
    content_sm: `모르는 것을 스스로
찾아 학습하며
개발자로서의 성장을
주도적으로 즐기는 분`,
    content_md: `모르는 것을 스스로 찾아 학습하며
개발자로서의 성장을
주도적으로 즐기는 분`,
    comment: ``,
  },
  {
    id: `(03)`,
    content_sm: `팀원과 협업하며
지식을 나누고
끝까지 책임감을 갖고
결과물을 완성하는 분`,
    content_md: `팀원과 협업하며 지식을 나누고
끝까지 책임감을 갖고
결과물을 완성하는 분`,
    comment: ``,
  },
];

export default OurValuesSection;
