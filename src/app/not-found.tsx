import Link from "next/link";
import AnimatedContainer from "../components/AnimatedContainer";

export default function NotFound() {
  return (
    <AnimatedContainer>
      <div className="bg-[#F2F0ED] min-h-screen text-[#1a1a1a] flex flex-col items-center justify-center px-8">
        <p className="text-[9px] uppercase tracking-[0.5em] text-stone-400 mb-8">404</p>
        <h1 className="text-[80px] md:text-[140px] font-serif leading-[0.85] tracking-tighter text-center mb-10">
          페이지를<br />찾을 수<br />없습니다.
        </h1>
        <p className="text-base font-light text-stone-500 mb-12 text-center max-w-sm leading-relaxed">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.2em] bg-stone-900 text-white px-10 py-4 hover:bg-stone-700 transition-all text-center"
          >
            홈으로
          </Link>
          <Link
            href="/exhibitions"
            className="text-[10px] uppercase tracking-[0.2em] border border-stone-300 text-stone-600 px-10 py-4 hover:border-stone-900 hover:text-stone-900 transition-all text-center"
          >
            전시 둘러보기
          </Link>
        </div>
      </div>
    </AnimatedContainer>
  );
}
