import React, { useState } from 'react';
import { posts } from '../data/blog.js';
import { motion } from 'framer-motion';
import HoloPanel from '../components/HoloPanel'; // <-- add this import

/**
 * Blog page displays recent starlog entries. Each post is summarised in
 * a card; clicking a card reveals the full content in an overlay. The
 * design maintains a sci‑fi feel with subtle shadows and accent colours.
 */
export default function Blog() {
  const [openId, setOpenId] = useState(null);
  return (
   <section className="min-h-screen pt-24 md:pt-36 pb-12 px-4 font-mono flex items-start justify-center">
      
      <HoloPanel>
        <h2 className="mb-8 text-center text-4xl font-bold uppercase">
        Starlog
      </h2>
        <div className="mx-auto max-w-4xl space-y-4">
          {posts.map((post) => {
            const isOpen = openId === post.id;
            return (
              <motion.div
                key={post.id}
                initial={false}
                animate={{ backgroundColor: isOpen ? 'rgba(255,255,255,0.05)' : 'transparent' }}
                className="rounded-lg bg-black/50 p-4 shadow-inner backdrop-blur-sm"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : post.id)}
                  className="w-full text-left"
                >
                  <h3 className="text-xl font-semibold text-jedi-accent dark:text-sith-accent">
                    {post.title}
                  </h3>
                  <p className="text-xs opacity-60">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="mt-1 text-sm opacity-80">
                    {isOpen ? post.excerpt : post.excerpt}
                  </p>
                </button>
                {/* Expandable content */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  style={{ overflow: 'hidden' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {isOpen && (
                    <div className="mt-3 space-y-3 text-sm opacity-90">
                      {post.content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </HoloPanel>
    </section>
  );
}
