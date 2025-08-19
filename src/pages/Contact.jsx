import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import HoloPanel from '../components/HoloPanel'; // ← Import the hologram panel

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
  <section
  className="min-h-screen pt-24 md:pt-36 pb-12 px-4 font-mono flex items-start justify-center"
  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
>



      <div className="w-full max-w-xl">
        
        <HoloPanel>
          <h2 className="mb-8 text-center text-4xl font-bold uppercase">Contact</h2>
          {submitted ? (
            <div className="text-center">
              <h3 className="mb-2 text-2xl font-semibold text-jedi-accent dark:text-sith-accent">
                Transmission Received
              </h3>
              <p className="text-sm opacity-80">
                Thank you, {form.name || 'traveller'}. Your message has been
                logged in the ship’s system. I’ll respond via Holonet as soon as
                possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-wide">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-none border-b border-jedi-accent dark:border-sith-accent bg-transparent p-1 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-wide">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-none border-b border-jedi-accent dark:border-sith-accent bg-transparent p-1 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-xs uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full resize-none rounded-none border-b border-jedi-accent dark:border-sith-accent bg-transparent p-1 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-none border border-jedi-accent dark:border-sith-accent px-4 py-2 text-sm uppercase tracking-wide text-jedi-accent dark:text-sith-accent hover:bg-jedi-accent hover:text-jedi-background dark:hover:bg-sith-accent dark:hover:text-sith-background"
              >
                <PaperAirplaneIcon className="h-4 w-4 rotate-45" /> Send
              </button>
              <p className="mt-4 text-xs opacity-70">
                You can also connect with me on{' '}
                <a
                  href="https://www.linkedin.com/in/markus-fourie-847934239/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-jedi-accent dark:hover:text-sith-accent"
                >
                  LinkedIn
                </a>
                .
              </p>
            </form>
          )}
        </HoloPanel>
      </div>
    </section>
  );
}
