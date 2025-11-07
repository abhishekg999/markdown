export default function LoadingState() {
  return (
    <div className="h-full w-full flex">
      <div className="w-1/2 bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
      <div className="w-1/2 bg-neutral-50 dark:bg-neutral-950 animate-pulse" />
    </div>
  );
}
