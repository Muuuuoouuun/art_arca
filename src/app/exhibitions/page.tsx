import { exhibitions } from "../../lib/data";
import AnimatedContainer from "../../components/AnimatedContainer";
import ExhibitionsGrid from "../../components/ExhibitionsGrid";

export const metadata = {
  title: "Exhibitions — Art Arca",
  description: "Spring 2026 전시 목록. Art Arca가 큐레이션한 현대 미술 전시들을 만나보세요.",
};

export default function ExhibitionsPage() {
  return (
    <AnimatedContainer>
      <div className="bg-background min-h-screen text-foreground">
        {/* Page Header */}
        <header className="px-6 md:px-24 pt-28 pb-16 border-b border-stone-200 dark:border-stone-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 dark:text-stone-500 mb-4">Spring 2026</p>
              <h1 className="text-5xl md:text-7xl font-serif tracking-tight">Exhibitions</h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-stone-500 dark:text-stone-400">{exhibitions.length}개의 전시</p>
            </div>
          </div>
        </header>

        {/* 클라이언트 필터 + 그리드 */}
        <ExhibitionsGrid exhibitions={exhibitions} />

        <div className="pb-24" />
      </div>
    </AnimatedContainer>
  );
}
