import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050508] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center md:flex md:items-center md:justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center justify-center space-x-2 md:order-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold tracking-tight text-white uppercase text-xs">
            UserGen Platform
          </span>
        </div>

        {/* Dynamic sitemap tags / links simulated for SEO rules */}
        <div className="mt-4 flex items-center justify-center space-x-4 text-[11px] text-slate-500 md:order-3 md:mt-0">
          <span className="hover:text-slate-300 pointer-events-none cursor-default">Sitemap</span>
          <span>•</span>
          <span className="hover:text-slate-300 pointer-events-none cursor-default">Robots.txt</span>
          <span>•</span>
          <span className="hover:text-slate-300 pointer-events-none cursor-default">OG Schema</span>
          <span>•</span>
          <span className="text-blue-400 select-all">primesahitya@gmail.com</span>
        </div>

        {/* Dedication copyright */}
        <p className="mt-4 text-[11px] text-slate-600 md:order-2 md:mt-0 font-medium tracking-wide">
          &copy; {new Date().getFullYear()} UserGen. All rights reserved. Crafted for OG Hunters and Modern Digital Creators.
        </p>
      </div>
    </footer>
  );
}
