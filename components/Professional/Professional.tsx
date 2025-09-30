'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// --- TypeScript Interfaces ---
interface MasonryItem {
  id: number;
  imageUrl: string;
  title: string;
}

interface GridItemProps {
  item: MasonryItem;
}

interface MasonryGridProps {
  items: MasonryItem[];
}

// --- SVG Icons for the hover effect ---
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-white group-hover:text-pink-500 transition-colors"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

// --- Simplified mock data ---
const initialItems: MasonryItem[] = [
  { id: 1, imageUrl: 'https://desirable-bronze-cbuzrs8tlp.edgeone.app/cover.jpg', title: 'Financial Exploration' },
  { id: 2, imageUrl: 'https://constitutional-orange-9bt6qoxjmx.edgeone.app/Landing%20Page%20Design.jpg', title: 'Revolution your Workflow' },
  { id: 3, imageUrl: 'https://possible-teal-myk2i4zdba.edgeone.app/XZone%203D%20web.jpg', title: '3D Future Website landing page design for custom' },
  { id: 4, imageUrl: 'https://convincing-cyan-loyknqdtsz.edgeone.app/OCULUS.jpg', title: 'Future you need to Explore' },
  { id: 5, imageUrl: 'https://dual-blue-rrrcegxxjj.edgeone.app/Metal_Desktop.jpg', title: 'Golden 3D website interface design' },
  { id: 6, imageUrl: 'https://consistent-fuchsia-t7b07nwroc.edgeone.app/Hero.jpg', title: 'AI powered builder website development' },
  { id: 7, imageUrl: 'https://various-amethyst-tu8loob5io.edgeone.app/Homepage.jpg', title: 'TurNur The model in this website' },
  { id: 8, imageUrl: 'https://eligible-plum-pcaxuuaauo.edgeone.app/ETHERON.jpg', title: 'Ethoron added website in the future website' },
  { id: 9, imageUrl: 'https://neighbouring-brown-owj8w4ym3r.edgeone.app/Meta%20verse.jpg', title: 'Meta verse ai powered website' },
  { id: 10, imageUrl: 'https://high-jade-tahq0s9rmq.edgeone.app/hg.jpg', title: 'Path in the Woods' },
  { id: 11, imageUrl: 'https://optimistic-silver-avyggnjemy.edgeone.app/Landing%201.jpg', title: 'AI powered website builder' },
  { id: 12, imageUrl: 'https://continental-fuchsia-w97ultprnm.edgeone.app/Thumbnail.jpg', title: 'AI website thumbnail design' },
];

// --- GridItem Component ---
const GridItem: React.FC<GridItemProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="mb-4 break-inside-avoid relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative w-full h-64 rounded-xl shadow-lg overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover w-full h-full rounded-xl"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://placehold.co/400x300/fecaca/333333?text=Image+Not+Found`;
          }}
        />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"
          >
            <div className="p-4 h-full flex flex-col justify-between">
              <div className="flex justify-start gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-black/30 rounded-lg backdrop-blur-sm group"
                >
                  <HeartIcon />
                </motion.button>
              </div>
              <p className="text-white font-bold text-base truncate">{item.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- MasonryGrid Component ---
const MasonryGrid: React.FC<MasonryGridProps> = ({ items }) => {
  return (
    <div
      className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4"
      style={{ columnWidth: '280px' }}
    >
      {items.map((item) => (
        <GridItem key={item.id} item={item} />
      ))}
    </div>
  );
};

// --- Main App Component ---
export default function Masonry() {
  return (
    <div className="font-sans transition-colors py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main>
          <MasonryGrid items={initialItems} />
        </main>
      </div>
    </div>
  );
}
