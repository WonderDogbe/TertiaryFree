export function InstitutionCard({
  name,
  abbreviation,
  isSelected,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex h-full min-h-[132px] w-full flex-col justify-between rounded-xl border p-5 text-left transition-all duration-200 ${
        isSelected
          ? "border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-900/20"
          : "border-gray-200 bg-white hover:border-blue-500 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400"
      }`}
      aria-pressed={isSelected}
    >
      <p className="text-base font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
        {name}
      </p>
      <p className="mt-1 text-sm font-medium tracking-wide text-gray-500 transition-colors duration-300 dark:text-gray-400">
        {abbreviation}
      </p>
    </button>
  );
}
