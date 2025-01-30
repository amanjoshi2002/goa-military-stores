"use client";

import { Shield, Award, Users, Clock } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">About Noble Military Stores</h2>
            <p className="text-gray-600 mb-8">
              Since 1970, Noble Military Stores has been a trusted provider of high-quality military and tactical equipment. 
              Our commitment to excellence and customer satisfaction has made us a leader in the industry.
            </p>
            <p className="text-gray-600 mb-8">
              We take pride in offering authentic military gear, tactical equipment, and professional-grade products 
              that meet the highest standards of quality and durability.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-[#b08968]" />
                <div>
                  <h4 className="font-semibold">Quality Assured</h4>
                  <p className="text-sm text-gray-500">Military-grade products</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-[#b08968]" />
                <div>
                  <h4 className="font-semibold">Certified</h4>
                  <p className="text-sm text-gray-500">ISO 9001:2015</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-[#b08968]" />
                <div>
                  <h4 className="font-semibold">Expert Team</h4>
                  <p className="text-sm text-gray-500">Professional support</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-[#b08968]" />
                <div>
                  <h4 className="font-semibold">50+ Years</h4>
                  <p className="text-sm text-gray-500">Of excellence</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1579453437873-b765a26aba9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Military Store"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1595591597670-ba12cc1f3d85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Military Equipment"
              className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}