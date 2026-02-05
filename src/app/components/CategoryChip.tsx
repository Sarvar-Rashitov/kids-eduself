interface CategoryChipProps {
  name: string;
  icon: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function CategoryChip({ name, icon, isActive = false, onClick }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
        isActive
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{name}</span>
    </button>
  );
}
