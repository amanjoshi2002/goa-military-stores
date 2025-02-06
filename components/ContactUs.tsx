"use client";

import { Phone, Mail, MapPin, Send } from "lucide-react";
import React from 'react';

export default function ContactUs() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-50 p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#b08968] rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600">+91-7942687658</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#b08968] rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">websupport@justdial.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="w-16 h-16 bg-[#b08968] rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-600">Shop No. #8, 1st Floor, Karma Paes Avenue Bldg, F L Gomes Road, Vasco Da Gama, Goa - 403802</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-80 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d146.1234567890!2d73.8109222!3d15.3983001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc7bb9d195d2b%3A0xa8cf0c1707aecbcb!2sGoa%20Military%20Stores!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
            <form action="https://api.staticforms.xyz/submit" method="post">
              {/* Replace with accessKey sent to your email */}
              <input type="hidden" name="accessKey" value="e44fc5d0-0b52-4cb1-9f79-fefc3800d89c" /> {/* Required */}
              
              <input
                type="text"
                name="name"
                placeholder="Your Name" // Optional
                required
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#b08968] mb-4"
              />
              
              <input
                type="text"
                name="subject"
                placeholder="Subject" // Optional
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#b08968] mb-4"
              />
              
              <input
                type="email"
                name="email"
                placeholder="Your Email" // Optional
                required
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#b08968] mb-4"
              />
              
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone" // Optional
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#b08968] mb-4"
              />
              
              <textarea
                name="message"
                placeholder="Your Message" // Optional
                required
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#b08968] h-32 mb-4"
              ></textarea>
              
              {/* If you want replyTo to be set to specific email */}
              <input type="hidden" name="replyTo" value="myreplytoemail@example.com" /> {/* Optional */}
              
              {/* Specify @ as reply to value if you want it to be customer's email */}
              <input type="hidden" name="replyTo" value="@" /> {/* Optional */}
              
              {/* If you want form to redirect to a specific URL after submission */}
              <input type="hidden" name="redirectTo" value="https://example.com/contact/success" /> {/* Optional */}
              
              <button
                type="submit"
                className="w-full bg-[#b08968] text-white py-3 rounded-lg hover:bg-[#8e6d53] transition-colors flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}