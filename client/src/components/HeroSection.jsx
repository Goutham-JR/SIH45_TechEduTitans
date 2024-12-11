import React from "react";

const HeroSection = ({ title, description, imageUrl }) => {
  return (
    <section className="relative bg-gray-700 text-white py-16 px-8 flex flex-col md:flex-row items-center justify-between">
      {/* SVG Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          viewBox="0 0 600 671"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M172.978 135.107C188.046 67.5437 268.124 43.3778 318.05 91.3281L319.863 93.0696C342.898 115.19 375.191 123.397 404.881 114.673L407.221 113.986C471.578 95.0755 533.44 155.308 519.291 223.106L518.777 225.569C512.251 256.846 522.182 289.755 544.921 312.2L546.711 313.966C596.002 362.621 577.787 447.017 513.712 466.866L511.383 467.586C481.824 476.744 459.461 501.446 452.508 532.614L451.961 535.068C436.895 602.632 356.816 626.798 306.889 578.847L305.076 577.106C282.043 554.986 249.747 546.779 220.057 555.502L217.72 556.19C153.362 575.099 91.5009 514.868 105.648 447.069L106.162 444.608C112.689 413.331 102.757 380.422 80.0184 357.976L78.2282 356.209C28.9387 307.556 47.1541 223.157 111.228 203.31L113.556 202.589C143.115 193.432 165.48 168.731 172.431 137.561L172.978 135.107Z"
            fill="#EC8305"
            opacity="0.3"
          />
          <path
            d="M190.367 160.036C203.556 100.894 273.652 79.7408 317.354 121.714L318.941 123.238C339.105 142.601 367.373 149.785 393.362 142.149L395.41 141.547C451.745 124.994 505.895 177.719 493.51 237.065L493.06 239.221C487.347 266.599 496.04 295.406 515.945 315.053L517.511 316.599C560.659 359.188 544.714 433.065 488.627 450.439L486.587 451.07C460.713 459.086 441.138 480.708 435.051 507.991L434.572 510.139C421.385 569.281 351.288 590.435 307.585 548.461L305.997 546.937C285.836 527.575 257.566 520.391 231.577 528.026L229.531 528.628C173.196 545.181 119.046 492.458 131.429 433.11L131.879 430.955C137.592 403.578 128.899 374.771 108.995 355.123L107.427 353.576C64.2821 310.988 80.2269 237.11 136.314 219.736L138.351 219.105C164.226 211.09 183.803 189.468 189.888 162.184L190.367 160.036Z"
            fill="#EC8305"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Content Container with Relative Positioning */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg mb-6">{description}</p>
          <button className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-lg font-medium text-lg">
            Join Courses
          </button>
        </div>

        {/* Right Side (Optional Image/Space) */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={imageUrl} // Replace with the actual path to your image
            alt="Learning Illustration"
            className="relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
