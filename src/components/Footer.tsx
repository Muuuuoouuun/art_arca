export default function Footer() {
  return (
    <footer className="px-8 md:px-24 py-16 border-t border-stone-200 dark:border-stone-800 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-stone-900 dark:text-stone-100 mb-2">
            Art Arca
          </p>
          <p className="text-[10px] text-stone-500 dark:text-stone-400 tracking-wide">
            예술들의 집합체, 예술과 대중, 대중과 예술
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
            Spring 2026 Edition
          </p>
          <p className="text-[9px] text-stone-400 dark:text-stone-600 mt-1">
            © 2026 Art Arca. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
