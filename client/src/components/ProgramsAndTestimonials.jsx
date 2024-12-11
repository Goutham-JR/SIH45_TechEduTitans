import React from "react";

const ProgramsAndTestimonials = ({ programs, testimonials }) => {
  return (
    <div className="bg-gray-100 py-10 px-5">
      {/* Programs Section */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Programs</h2>
        <p className="text-gray-600 mb-8">
          Explore our diverse range of programs designed for learners worldwide.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={program.imageUrl}
                alt={program.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-blue-900">
                  {program.title}
                </h3>
                <p className="text-gray-600 mt-2">{program.description}</p>
                <button className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-800">
                  READ MORE
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">
          What Our Students Say
        </h2>
        <p className="text-gray-600 mb-8">
          Hear from our students about their learning experiences.
        </p>

        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="relative bg-blue-900 text-white py-8 px-6 rounded-lg shadow-lg mb-8"
          >
            <blockquote className="text-lg italic mb-6">
              "{testimonial.quote}"
            </blockquote>
            <div className="flex items-center justify-center">
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="rounded-full w-20 h-20 border-4 border-white"
              />
              <div className="ml-4 text-left">
                <h4 className="text-xl font-bold">{testimonial.name}</h4>
                <p className="text-sm">{testimonial.location}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProgramsAndTestimonials;
