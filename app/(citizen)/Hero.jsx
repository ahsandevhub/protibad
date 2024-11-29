import Link from "next/link";

const Hero = () => {
  return (
    <div className="mb-10">
      <div className="relative container m-5 rounded-lg text-slate-50 pt-10 pb-28 sm:py-[150px] text-center mx-auto max-w-screen-xl bg-gradient-to-br from-red-500 to-red-400 flex flex-col items-center justify-start shadow-lg">
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide mb-4">
          প্রতিবাদ অ্যাপে স্বাগত!
        </h2>
        <p className="text-sm sm:text-base md:text-lg max-w-3xl text-slate-100 px-4">
          একটি শক্তিশালী প্ল্যাটফর্ম যেখানে আপনার অভিযোগ জমা দিন, প্রশাসনের
          জবাবদিহিতা নিশ্চিত করুন, এবং দেশের উন্নয়নে সক্রিয় ভূমিকা রাখুন।
        </p>

        {/* Call-to-Action Buttons */}
        <div className="sm:mt-8 mt-5 flex flex-wrap gap-4 justify-center">
          <Link
            href={"/register"}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-sm sm:text-lg font-medium shadow-md transition"
          >
            রেজিস্টার করুন
          </Link>
          <Link
            href={"/complaint"}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg text-sm sm:text-lg font-medium shadow-md transition"
          >
            অভিযোগ জমা দিন
          </Link>
        </div>

        {/* Highlighted Info Section */}
        <div className="absolute left-1/2 bg-white text-gray-800 w-[90%] sm:w-[80%] -translate-x-1/2 h-auto grid grid-cols-1 sm:grid-cols-3 gap-6 items-start justify-center rounded-md border sm:-bottom-[60px] -bottom-[145px] py-6 px-4 sm:px-8 shadow-md">
          {/* Card 1 */}
          <div className="card text-base sm:text-lg border-l-4 border-green-500 pl-4">
            <h4 className="font-bold text-sm sm:text-lg">রেজিস্টার করুন</h4>
            <p className="text-xs sm:text-sm text-gray-600">
              আপনার অ্যাকাউন্ট তৈরি করে সহজেই অভিযোগ জমা দিন।
            </p>
          </div>
          {/* Card 2 */}
          <div className="card text-base sm:text-lg border-l-4 border-yellow-500 pl-4">
            <h4 className="font-bold text-sm sm:text-lg">
              অভিযোগ ট্র্যাক করুন
            </h4>
            <p className="text-xs sm:text-sm text-gray-600">
              আপনার অভিযোগের বর্তমান অবস্থা এবং সমাধানের অগ্রগতি দেখুন।
            </p>
          </div>
          {/* Card 3 */}
          <div className="card text-base sm:text-lg border-l-4 border-red-500 pl-4">
            <h4 className="font-bold text-sm sm:text-lg">
              প্রমাণ সংযুক্ত করুন
            </h4>
            <p className="text-xs sm:text-sm text-gray-600">
              ছবি, ভিডিও, বা অন্যান্য ফাইল আপলোড করে আপনার অভিযোগকে আরো কার্যকর
              করুন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
