import type { ItemClass } from '../types';

interface ClassBadgeProps {
  itemClass: ItemClass;
  size?: 'sm' | 'md' | 'lg';
}

export function ClassBadge({ itemClass, size = 'md' }: ClassBadgeProps) {
  const colors = {
    S: 'bg-class-s/20 text-class-s border-class-s/40',
    A: 'bg-class-a/20 text-class-a border-class-a/40',
    B: 'bg-class-b/20 text-class-b border-class-b/40',
    C: 'bg-class-c/20 text-class-c border-class-c/40',
  };

  const sizes = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
    lg: 'text-sm px-3 py-1',
  };

  return (
    <span className={`inline-flex items-center justify-center rounded border font-bold ${colors[itemClass]} ${sizes[size]}`}>
      {itemClass}
    </span>
  );
}
