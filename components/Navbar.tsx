"use client";

import { useState } from "react";
import { ShoppingCart, Phone, Mail, MapPin, ChevronDown, Menu, X } from "lucide-react";

const categories = [
  {
    name: "Combat Gear",
    subcategories: ["Tactical Vests", "Helmets", "Body Armor", "Combat Boots"]
  },
  {
    name: "Uniforms",
    subcategories: ["Combat Uniforms", "Dress Uniforms", "Training Gear", "Accessories"]
  },
  {
    name: "Equipment",
    subcategories: ["Bags & Packs", "Holsters", "Belts", "Storage Solutions"]
  },
  {
    name: "Accessories",
    subcategories: ["Patches", "Insignias", "Badges", "Tactical Gear"]
  }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Mobile dropdown state

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#b08968] text-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="tel:+91-8888888888" className="flex items-center space-x-1 text-sm">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">+91-8888888888</span>
            </a>
            <a href="mailto:websupport@justdial.com" className="flex items-center space-x-1 text-sm">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">websupport@justdial.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Malad West</span>
            </div>
            <a href="/login" className="text-sm">Log In | Sign Up</a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md relative z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b08968]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <span className="text-s sm:text-xl md:text-2xl font-bold">Goa Military Stores</span>

            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="/" className="font-medium hover:text-[#b08968] transition-colors">HOME</a>
              
              {/* Categories Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setHoveredCategory(null)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button className="flex items-center space-x-1 font-medium hover:text-[#b08968] transition-colors">
                  <span>CATEGORIES</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="relative"
                      onMouseEnter={() => setHoveredCategory(category.name)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <a
                        href={`/category/${category.name.toLowerCase()}`}
                        className="block px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                      >
                        <span>{category.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </a>
                      {hoveredCategory === category.name && (
                        <div className="absolute left-full top-0 w-48 bg-white shadow-lg rounded-lg py-2">
                          {category.subcategories.map((sub) => (
                            <a
                              key={sub}
                              href={`/category/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              {sub}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <a href="#about" className="font-medium hover:text-[#b08968] transition-colors">ABOUT US</a>
              <a href="#contact" className="font-medium hover:text-[#b08968] transition-colors">CONTACT US</a>
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-4">
              <div className="relative w-36 sm:w-48">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#b08968]"
                />
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 transition-all duration-300 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col space-y-2">
              <a href="/" className="px-4 py-2 hover:bg-gray-100">HOME</a>

              {/* Mobile Categories */}
              {categories.map((category) => (
                <div key={category.name}>
                  <button 
                    className="w-full px-4 py-2 hover:bg-gray-100 text-left flex items-center justify-between"
                    onClick={() => setOpenDropdown(openDropdown === category.name ? null : category.name)}
                  >
                    <span>{category.name}</span>
                    <ChevronDown className={`h-4 w-4 transform transition-transform ${
                      openDropdown === category.name ? "rotate-180" : ""
                    }`} />
                  </button>
                  {openDropdown === category.name && (
                    <div className="bg-gray-50 py-2">
                      {category.subcategories.map((sub) => (
                        <a
                          key={sub}
                          href={`/category/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                          className="block px-8 py-2 hover:bg-gray-100"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <a href="/products" className="px-4 py-2 hover:bg-gray-100">PRODUCTS</a>
              <a href="#about" className="px-4 py-2 hover:bg-gray-100">ABOUT US</a>
              <a href="#gallery" className="px-4 py-2 hover:bg-gray-100">GALLERY</a>
              <a href="#contact" className="px-4 py-2 hover:bg-gray-100">CONTACT US</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
