import { Typography } from "@material-tailwind/react";

export function Footer() {
  return (
    <footer className="flex flex-col md:flex-row w-full items-center justify-between gap-y-3 gap-x-3 border-t border-blue-gray-100 py-2 px-4 text-sm text-center mt-10">
      {/* Copyright Section */}
      <Typography color="blue-gray" className="font-normal">
        &copy; {new Date().getFullYear()} EduLearn. All rights reserved.
      </Typography>

      {/* Navigation Links */}
      <ul className="flex flex-wrap items-center gap-y-1 gap-x-6">
        <li>
          <Typography
            as="a"
            href="#about-us"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            About Us
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#license"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            License
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#contribute"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Contribute
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#contact-us"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}
