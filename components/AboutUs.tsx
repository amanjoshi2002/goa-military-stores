"use client";

import { Shield, Award, Users, Clock } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div>
            <h2 className="text-xl sm:text-4xl font-bold mb-6 text-center sm:text-left">
              About Noble Military Stores
            </h2>
            <p className="text-gray-600 text-s sm:text-lg  mb-6 text-center sm:text-left">
              Since 1970, Noble Military Stores has been a trusted provider of high-quality 
              military and tactical equipment. Our commitment to excellence and customer satisfaction 
              has made us a leader in the industry.
            </p>
            <p className="text-gray-600 text-s  sm:text-lg mb-8 text-center sm:text-left">
              We take pride in offering authentic military gear, tactical equipment, and professional-grade 
              products that meet the highest standards of quality and durability.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Shield className="w-8 h-8 text-[#b08968]" />, title: "Quality Assured", desc: "Military-grade products" },
                { icon: <Award className="w-8 h-8 text-[#b08968]" />, title: "Certified", desc: "ISO 9001:2015" },
                { icon: <Users className="w-8 h-8 text-[#b08968]" />, title: "Expert Team", desc: "Professional support" },
                { icon: <Clock className="w-8 h-8 text-[#b08968]" />, title: "50+ Years", desc: "Of excellence" },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {item.icon}
                  <div>
                    <h4 className="font-semibold text-m">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Images */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1579453437873-b765a26aba9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Military Store"
              className="rounded-lg shadow-lg w-full h-40 sm:h-64 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1595591597670-ba12cc1f3d85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Military Equipment"
              className="rounded-lg shadow-lg w-full h-40 sm:h-64 object-cover mt-4 sm:mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
