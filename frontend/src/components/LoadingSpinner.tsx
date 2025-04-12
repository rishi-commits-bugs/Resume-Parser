export default function LoadingSpinner({ text = "Processing..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-6 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-t-secondary border-r-transparent border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
      </div>
      <p className="mt-6 text-body font-medium text-lg">{text}</p>
    </div>
  );
} 