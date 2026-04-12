function MainLoading() {
  return (
    <div className="flex space-x-2">
      <div
        className="w-4 h-4 bg-brand rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="w-4 h-4 bg-brand rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="w-4 h-4 bg-brand rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
}

export default MainLoading;
