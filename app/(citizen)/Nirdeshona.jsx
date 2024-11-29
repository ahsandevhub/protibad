const Nirdeshona = () => {
  return (
    <div className="relative sm:mt-28 mt-48 mb-24 sm:my-[150px]">
      <div className="absolute left-0 -top-[130px]" id="nirdeshona"></div>
      <div className="container max-w-screen-xl mx-auto px-4">
        {/* Heading Section */}
        <div className="heading text-center mb-8">
          <h1 className="relative font-semibold inline-block mx-auto text-2xl sm:text-3xl text-red-600 bg-white px-3">
            নির্দেশনা
            <div className="absolute w-[200px] sm:w-[250px] left-1/2 -translate-x-1/2 h-[5px] top-1/2 -translate-y-1/2 bg-red-600 -z-10"></div>
          </h1>
        </div>

        {/* Content Section */}
        <div className="content text-base sm:text-lg text-gray-700 leading-relaxed space-y-8">
          {/* What is Protibad */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">
              #প্রতিবাদ কি?
            </h3>
            <p>
              <span className="font-semibold">প্রতিবাদ</span> একটি অনলাইন
              প্ল্যাটফর্ম, যেখানে নাগরিকেরা সহজেই তাদের অভিযোগ জমা দিতে পারবেন
              এবং অভিযোগের অগ্রগতি সম্পর্কে আপডেট পেতে পারবেন। এটি সরকার এবং
              নাগরিকদের মধ্যে একটি স্বচ্ছ এবং কার্যকর সংযোগ তৈরি করে।
            </p>
          </div>

          {/* How It Works */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">
              #কিভাবে কাজ করে?
            </h3>
            <p>
              নাগরিকরা তাদের অভিযোগ জমা দেয়ার পরে স্থানীয় কর্তৃপক্ষ অভিযোগটি
              সমাধানের চেষ্টা করে। যদি তারা ব্যর্থ হয়, অভিযোগটি উচ্চতর
              কর্তৃপক্ষের কাছে প্রেরণ করা হয়। নাগরিকেরা তাদের অভিযোগের প্রতিটি
              পর্যায়ে আপডেট পেয়ে থাকেন।
            </p>
          </div>

          {/* Benefits Section */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">
              #সুবিধাসমূহ
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>অভিযোগ জমা দেওয়ার সহজ পদ্ধতি।</li>
              <li>ছবি, ভিডিও, এবং অডিও সহ প্রমাণ যোগ করার সুবিধা।</li>
              <li>অভিযোগের বর্তমান অবস্থা ট্র্যাক করার ক্ষমতা।</li>
              <li>সরকারি কর্মক্ষমতা সম্পর্কে স্বচ্ছ রিপোর্টিং।</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nirdeshona;
