
export default function JournalCardPlaceholder({ text , className }: { text: string , className? :string }) {
  return (
    <div className={`h-64 flex flex-col justify-center text-center rounded-lg p-6 border-2 border-dashed  text-fg shadow-inner ${className}`}>
      <p className="text-fg text-lg font-medium">{text}</p>
    </div>
  );
}
