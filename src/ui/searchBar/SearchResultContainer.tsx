function SearchResultContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="border rounded-md border-borderFull border-opacity-25 max-h-72 overflow-auto scroll-container shadow-sm shadow-overlay text-start">
      {children}
    </div>
  );
}

export default SearchResultContainer;
