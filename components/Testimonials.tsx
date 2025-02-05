"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Major Rakesh Sharma",
    role: "Indian Army Veteran",
    rating: 5,
    image: "/images/client1.jpg",
    testimonial:
      "Noble Military Stores provides the highest quality tactical gear. Their products are battle-tested and exceed expectations!",
  },
  {
    id: 2,
    name: "Lt. Anjali Verma",
    role: "Special Forces Officer",
    rating: 4,
    image: "/images/client2.jpg",
    testimonial:
      "Exceptional service and durable equipment. Highly recommended for professionals and enthusiasts alike!",
  },
  {
    id: 3,
    name: "Commander Arjun Mehta",
    role: "Naval Officer",
    rating: 5,
    image: "/images/client3.jpg",
    testimonial:
      "Goa Military Store has the best selection of authentic military gear. Their customer service is top-notch!",
  },
  {
    id: 4,
    name: "Col. Vikram Singh",
    role: "Paratrooper",
    rating: 5,
    image: "/images/client4.jpg",
    testimonial:
      "Outstanding collection and great service! A trusted store for military professionals.",
  },
  {
    id: 5,
    name: "Capt. Rohan Kapoor",
    role: "Infantry Officer",
    rating: 4,
    image: "/images/client5.jpg",
    testimonial:
      "Authentic and durable gear at great prices. Definitely worth checking out!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
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
          {/* Testimonial Cards - Desktop View */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="bg-white shadow-xl rounded-lg p-6 md:p-8 flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full shadow-md mb-4"
                />
                <p className="text-lg text-gray-600 italic">"{testimonial.testimonial}"</p>
                <div className="flex justify-center mt-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" />
                  ))}
                </div>
                <h4 className="mt-4 font-semibold text-lg">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonial Card - Mobile View (Carousel) */}
          <motion.div
            key={testimonials[currentIndex].id}
            className="md:hidden bg-white shadow-xl rounded-lg p-6 md:p-8 flex flex-col items-center text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              className="w-20 h-20 rounded-full shadow-md mb-4"
            />
            <p className="text-lg text-gray-600 italic">
              "{testimonials[currentIndex].testimonial}"
            </p>
            <div className="flex justify-center mt-3">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" />
              ))}
            </div>
            <h4 className="mt-4 font-semibold text-lg">{testimonials[currentIndex].name}</h4>
            <p className="text-gray-500 text-sm">{testimonials[currentIndex].role}</p>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={prevTestimonial}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
          >
            ←
          </button>
          <button
            onClick={nextTestimonial}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
