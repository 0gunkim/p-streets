import { useState } from "react";
import TagList from "components/TagList";
import { ReactComponent as Magnifier } from "../assets/magnifier.svg";
import { ReactComponent as Down } from "../assets/down.svg";
import { ReactComponent as Up } from "../assets/up.svg";
import map from "../assets/mapIMG.png";
import DaumPostCode from "react-daum-postcode";
// import useKeywordMap from "components/common/keyword_map/useKeywordMap";

export default function Search() {
  const [isPopUp, setIsPopUp] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [keyWord, setKeyWord] = useState("");

  const handleInput = (e: React.MouseEvent) => {
    setIsPopUp(!isPopUp);
    setKeyWord("");
  };
  const handleAddress = (data: any) => {
    setKeyWord(data.address);
  };
  const handleMapToggle = () => {
    setIsMapOpen(!isMapOpen);
  };
  const handleTagToggle = () => {
    setIsTagOpen(!isTagOpen);
  };

  return (
    <div className="w-full flex flex-col justify-center content-center">
      <section className="bg-white border-b-2 border-[#F5F4F3]">
        <div className="w-[350px] m-[20px] px-[16px] py-[8px] flex justify-center items-center border-[1.2px] rounded-full border-[#0f0f0f]">
          <Magnifier />
          <input
            type="search"
            placeholder="도로명 주소 검색"
            className="w-full ml-2.5 font-medium focus:outline-none"
            onClick={handleInput}
            value={keyWord}
          />
        </div>
        {isPopUp && (
          <div className="px-[20px]">
            <DaumPostCode onComplete={handleAddress} autoClose />
          </div>
        )}
      </section>
      <section className="bg-white border-b-2 border-[#F5F4F3]">
        <div className="py-[20px] flex justify-between items-center">
          <p className="px-[20px] text-xl font-bold">지도 탐색하기</p>
          <button className="px-[20px]" onClick={handleMapToggle}>
            {!isMapOpen ? <Down /> : <Up />}
          </button>
        </div>
        {isMapOpen && (
          <div
            className="w-full h-60 opacity-50 flex justify-center items-center text-lg font-semibold"
            style={{ backgroundImage: `url(${map})` }}
          >
            준비중...
          </div>
        )}
        {/* TODO: 추후 변경 필요 이미지 -> 지도에서 직접 핀 찍는 기능*/}
        {/* <div className="mb-5 flex">{useKeywordMap({ keyWord })}</div> */}
      </section>
      <section className="bg-white border-b-2 border-[#F5F4F3]">
        <div className="py-[20px] flex justify-between items-center">
          <p className="px-[20px] text-xl font-bold">장소 태그</p>
          <button className="px-[20px]" onClick={handleTagToggle}>
            {!isTagOpen ? <Down /> : <Up />}
          </button>
        </div>
        {isTagOpen ? <TagList /> : ""}
      </section>
      <section className="bg-white border-b-2 border-[#F5F4F3]">
        <div className="py-[20px] flex justify-between items-center">
          <p className="px-[20px] text-xl font-bold">아티클 둘러보기</p>
          <button className="px-[20px] text-sm font-medium text-[#F22222]">초기화</button>
        </div>
        <div>검색 결과 무한 스크롤</div>
      </section>
    </div>
  );
}
