"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Phone, Mail, MapPin, ChevronDown, Menu, X } from "lucide-react";

interface Category {
  _id: string;
  name: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#b08968] text-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="tel:+91-7942687658" className="flex items-center space-x-1 text-sm">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">+91-7942687658</span>
            </a>
            <a href="mailto:websupport@justdial.com" className="flex items-center space-x-1 text-sm">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">websupport@justdial.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm">
              <MapPin className="h-4 w-4" />
              <a href="https://maps.app.goo.gl/duS3pNbcG6dJUsEz9" target="_blank" rel="noopener noreferrer" className="hidden sm:inline hover:text-white">
                Shop No. #8, 1st Floor, Karma Paes Avenue Bldg., F L Gomes Road, Vasco Da Gama, Goa - 403802
              </a>
            </div>
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
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 font-medium hover:text-[#b08968] transition-colors"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>CATEGORIES</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className={`absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 ${isDropdownOpen ? 'block' : 'hidden'}`}>
                  {categories.map((category) => (
                    <a
                      key={category._id}
                      href={`/products?category=${encodeURIComponent(category.name)}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>

              <a href="#about" className="font-medium hover:text-[#b08968] transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>ABOUT US</a>
              <a href="#contact" className="font-medium hover:text-[#b08968] transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>CONTACT US</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <a href="/" className="block py-2 hover:text-[#b08968]">HOME</a>
            <div className="relative">
              <button 
                className="flex items-center space-x-1 font-medium hover:text-[#b08968] transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>CATEGORIES</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="mt-2 bg-white shadow-lg rounded-lg py-2">
                  {categories.map((category) => (
                    <a
                      key={category._id}
                      href={`/products?category=${encodeURIComponent(category.name)}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="#about" className="block py-2 hover:text-[#b08968]">ABOUT US</a>
            <a href="#contact" className="block py-2 hover:text-[#b08968]">CONTACT US</a>
          </div>
        </div>
      )}
    </>
  );
}
