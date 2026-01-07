import Link from 'next/link';

export default function About() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-6xl font-bold text-black">About Me</h1>
        <Link
          href="/"
          className="px-8 py-4 bg-black text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-colors pointer-events-auto cursor-pointer"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
