import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-6xl font-bold text-black">Home</h1>
        <Link
          href="/about"
          className="px-8 py-4 bg-black text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-colors pointer-events-auto cursor-pointer"
        >
          Go to About Me
        </Link>
      </div>
    </div>
  );
}
