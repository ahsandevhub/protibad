import Link from "next/link";

const CitizenDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container max-w-screen-xl py-10 px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Dashboard Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            সিটিজেন ড্যাশবোর্ড
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            আপনার অ্যাকাউন্টের সমস্ত তথ্য এখানে দেখতে পারবেন। অভিযোগ জমা দিন এবং
            আপনার অগ্রগতি ট্র্যাক করুন।
          </p>
        </div>

        {/* Dashboard Options */}
        <div className="flex flex-wrap gap-6 justify-center mb-10">
          {/* Card 1: Register Complaint */}
          <Link
            href="/dashboard/complaint"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-lg text-sm sm:text-lg font-medium shadow-md transition w-full sm:w-80"
          >
            অভিযোগ জমা দিন
          </Link>

          {/* Card 2: Track Complaints */}
          <Link
            href="/dashboard/complaints-status"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded-lg text-sm sm:text-lg font-medium shadow-md transition w-full sm:w-80"
          >
            অভিযোগ ট্র্যাক করুন
          </Link>

          {/* Card 3: Update Profile */}
          <Link
            href="/dashboard/profile"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg text-sm sm:text-lg font-medium shadow-md transition w-full sm:w-80"
          >
            আপনার প্রোফাইল আপডেট করুন
          </Link>
        </div>

        {/* Previous Complaints Table Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            পূর্ববর্তী অভিযোগসমূহ
          </h3>

          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  অভিযোগের বিষয়
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  জমার তারিখ
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  বর্তমান অবস্থা
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  বিস্তারিত
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Sample row, repeat for each complaint */}
              <tr className="border-b border-gray-100">
                <td className="px-4 py-2 text-sm text-gray-600">
                  রাস্তা খোঁড়াখুঁড়ি
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  10 নভেম্বর 2024
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  প্রক্রিয়াধীন
                </td>
                <td className="px-4 py-2 text-sm text-blue-500 hover:text-blue-600">
                  <Link href="/complaint-details/1">দেখুন</Link>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-2 text-sm text-gray-600">
                  বিদ্যুৎ সমস্যার প্রতিবেদন
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  5 নভেম্বর 2024
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  সমাধান হয়েছে
                </td>
                <td className="px-4 py-2 text-sm text-blue-500 hover:text-blue-600">
                  <Link href="/complaint-details/2">দেখুন</Link>
                </td>
              </tr>
              {/* More rows can be added as needed */}
            </tbody>
          </table>
        </div>

        {/* Additional Info or Actions */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">
            আপনার অ্যাকাউন্ট এবং অভিযোগ সম্পর্কিত আরও তথ্য পেতে আমাদের সাথে
            যোগাযোগ করুন।
          </p>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboardPage;
