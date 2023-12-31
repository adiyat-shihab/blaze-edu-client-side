import "react-lazy-load-image-component/src/effects/blur.css";
import { Logo } from "../../Utils/Logo.jsx";

export const Footer = () => {
  return (
    <>
      <footer className="bg-[#FDF8EE] dark:bg-gray-900 ">
        <div className="mx-auto  p-4 py-6 xl:pl-[12.25rem] xl:pr-[15.5rem] lg:py-8">
          <div className="lg:flex    lg:justify-between">
            <div className="mb-6 md:mb-0">
              <Logo />
              <p className="md:w-[19.875rem] mt-[2.12rem] text-gray-500 dark:text-gray-400 font-medium ">
                Explore boundless educational opportunities with Blaze Edu,
                where learning meets innovation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8  sm:flex sm:justify-between   sm:space-x-9">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Company
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">About Us</li>
                  <li>How to work?</li>
                  <li>Populer Course</li>
                  <li>Service</li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Courses
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">Categories</li>
                  <li>Offline Course</li>
                  <li>Video Course</li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Support
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">FAQ</li>
                  <li className="mb-4">Help Center</li>
                  <li className="mb-4">Career</li>
                  <li className="mb-4">Privacy</li>
                </ul>
              </div>{" "}
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Contac Info
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">+0913-705-3875</li>
                  <li className="mb-4 break-words">
                    ElizabethJ@jourrapide.com
                  </li>
                  <li className="mb-4">
                    4808 Skinner Hollow Road Days Creek, OR 97429
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center justify-center">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023 <p className="hover:underline inline">Blaze Edu</p>. All
              Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};
