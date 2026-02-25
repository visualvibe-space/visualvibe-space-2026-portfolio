import { cn } from "../../lib/utils";

function BentoGrid({ children, className }) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {children}
    </div>
  );
}

function BentoGridItem({ children, className }) {
  return (
    <div className={cn("group relative bg-[#111827] rounded-3xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all hover:shadow-xl", className)}>
      {children}
    </div>
  );
}

export { BentoGrid, BentoGridItem };
