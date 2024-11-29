const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About প্রতিবাদ</h3>
            <p className="text-gray-400">
              প্রতিবাদ is a platform that empowers citizens to voice their
              concerns and ensures government accountability through
              transparency and efficiency.
            </p>
            <p className="mt-3 text-slate-300">Developed by: UGV_Squad Team</p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-red-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500">
                  Submit Complaint
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">C&B Road, Barishal, Bangladesh</p>
            <p className="text-gray-400">Email: support@protibad.com</p>
            <p className="text-gray-400">Phone: +880-1704-428814</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
          <p>&copy; 2024 প্রতিবাদ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
