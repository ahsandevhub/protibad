import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">
        পৃষ্ঠা পাওয়া যায়নি!
      </h2>
      <p className="text-gray-600 mt-2 text-center">
        আপনি যে পৃষ্ঠায় যেতে চেয়েছেন সেটি অনুপলব্ধ অথবা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link
        href={"/"}
        className="mt-6 px-6 py-3 text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition"
      >
        হোমপেজে ফিরে যান
      </Link>
    </div>
  );
}
