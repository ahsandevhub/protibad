import Link from "next/link";
import { IoHome } from "react-icons/io5";

const Breadcrumb = ({ path }) => {
  const breadcrumbItems = path.split("/").filter((item) => item);

  return (
    <nav
      aria-label="breadcrumb"
      className="container max-w-screen-xl mx-auto sm:py-5 py-3 px-4 rounded-lg"
    >
      <ol className="flex text-sm text-gray-700">
        <li>
          <Link
            href="/"
            className="text-red-600 flex items-center gap-1 hover:text-red-800"
          >
            <IoHome className="text-lg mb-1" />
            <span>Home</span>
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="mx-1">/</span>
            <Link
              href={`/${breadcrumbItems.slice(0, index + 1).join("/")}`}
              className="text-gray-600 hover:text-red-600"
            >
              {item}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
