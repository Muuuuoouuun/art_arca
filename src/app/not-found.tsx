import Link from "next/link";
import AnimatedContainer from "../components/AnimatedContainer";

export default function NotFound() {
  return (
    <AnimatedContainer>
      <div className="bg-background min-h-screen text-foreground flex flex-col items-center justify-center px-8">
        <p className="text-[9px] uppercase tracking-[0.5em] text-stone-400 dark:text-stone-500 mb-8">404</p>
        <h1 className="text-[80px] md:text-[140px] font-serif leading-[0.85] tracking-tighter text-center mb-10">
          페이지를<br />찾을 수<br />없습니다.
        </h1>
        <p className="text-base font-light text-stone-500 dark:text-stone-400 mb-12 text-center max-w-sm leading-relaxed">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.2em] bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-10 py-4 hover:bg-stone-700 dark:hover:bg-stone-300 transition-all text-center btn-press"
          >
            홈으로
          </Link>
          <Link
            href="/exhibitions"
            className="text-[10px] uppercase tracking-[0.2em] border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 px-10 py-4 hover:border-stone-900 dark:hover:border-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-all text-center btn-press"
          >
            전시 둘러보기
          </Link>
        </div>
      </div>
    </AnimatedContainer>
  );
}
