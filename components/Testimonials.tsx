"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Santosh Kumar",
    rating: 4,
    testimonial:
      "Military accessories available\nArmy\nNavy\nAirforce\nCISF\nCRPF\nSecurity\nbut not more items like military clothes, tracksuit.",
  },
  {
    id: 2,
    name: "Hrishi Mathuria",
    rating: 4,
    testimonial:
      "The only shop near the base that could provide you with all the Military items.",
  },
  {
    id: 3,
    name: "Steffy Mathew",
    rating: 4,
    testimonial:
      "The best and only place in Goa where we get Military, Navy, NCC stuff. Good service.",
  },
  {
    id: 4,
    name: "Manoj Kumar",
    rating: 4,
    testimonial:
      "Military accessories are available\nOnly one shop in Goa for military purposes.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isBrowser = typeof window !== 'undefined'; // Check if running in the browser

  const nextTestimonials = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>

        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Display one testimonial for small screens, three for larger screens */}
            {isBrowser && window.innerWidth < 768 ? (
              <motion.div
                key={testimonials[currentIndex].id}
                className="bg-white shadow-xl rounded-lg p-6 md:p-8 flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">{testimonials[currentIndex].name.charAt(0)}</span>
                </div>
                <p className="text-lg text-gray-600 italic">"{testimonials[currentIndex].testimonial}"</p>
                <div className="flex justify-center mt-3">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" />
                  ))}
                </div>
                <h4 className="mt-4 font-semibold text-lg">{testimonials[currentIndex].name}</h4>
              </motion.div>
            ) : (
              testimonials.slice(currentIndex, currentIndex + 3).map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-white shadow-xl rounded-lg p-6 md:p-8 flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <p className="text-lg text-gray-600 italic">"{testimonial.testimonial}"</p>
                  <div className="flex justify-center mt-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" />
                    ))}
                  </div>
                  <h4 className="mt-4 font-semibold text-lg">{testimonial.name}</h4>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Navigation Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={nextTestimonials}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
