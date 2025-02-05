"use client";

import { Shield, Award, Users, Clock } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-center md:text-left">
              About Noble Military Stores
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-6 text-center md:text-left">
              Since 1970, Noble Military Stores has been a trusted provider of high-quality
              military and tactical equipment. Our commitment to excellence and customer satisfaction
              has made us a leader in the industry.
            </p>
            <p className="text-gray-600 text-base sm:text-lg mb-8 text-center md:text-left">
              We take pride in offering authentic military gear, tactical equipment, and professional-grade
              products that meet the highest standards of quality and durability.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {[
                { icon: <Shield className="w-10 h-10 text-[#b08968]" />, title: "Quality Assured", desc: "Military-grade products" },
                { icon: <Award className="w-10 h-10 text-[#b08968]" />, title: "Certified", desc: "ISO 9001:2015" },
                { icon: <Users className="w-10 h-10 text-[#b08968]" />, title: "Expert Team", desc: "Professional support" },
                { icon: <Clock className="w-10 h-10 text-[#b08968]" />, title: "50+ Years", desc: "Of excellence" },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  {item.icon}
                  <div>
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/3]">
              <img
                src="photos/1.jpg"
                alt="Military Store"
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="relative aspect-[4/3] mt-4 sm:mt-8">
              <img
                src="photos/2.jpg"
                alt="Military Equipment"
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
