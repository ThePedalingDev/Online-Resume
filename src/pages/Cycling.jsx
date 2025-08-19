import React, { useContext } from 'react';
import { rides } from '../data/rides.js';
import { ThemeContext } from '../context/ThemeContext.jsx';
import HoloPanel from '../components/HoloPanel'; // add this import

export default function Cycling() {
  const maxSpeed = 40; // km/h used to normalise gauge fill
  const { theme } = useContext(ThemeContext);
  const accentColor = theme === 'jedi' ? '#3fb0f7' : '#e63946';
  return (
    <section className="min-h-screen pt-24 md:pt-36 pb-12 px-4 font-mono flex items-start justify-center">
     
      <HoloPanel>
         <h2 className="mb-8 text-center text-4xl font-bold uppercase">
        Cycling Log
      </h2>
        <div className="mx-auto max-w-4xl space-y-6">
          {rides.map((ride) => {
            const speed = ride.distance / (ride.duration / 60);
            const percent = Math.min(speed / maxSpeed, 1);
            return (
              <div
                key={ride.id}
                className="grid grid-cols-1 gap-4 rounded-lg bg-black/50 p-4 shadow-inner backdrop-blur-sm md:grid-cols-4 md:items-center"
              >
                {/* Gauge */}
                <div className="flex justify-center">
                  <div
                    className="relative h-24 w-24 rounded-full flex items-center justify-center"
                    style={{
                      background: `conic-gradient(${accentColor} ${
                        percent * 360
                      }deg, transparent 0 360deg)`,
                    }}
                  >
                    <div className="absolute inset-2 rounded-full bg-black/80"></div>
                    <span className="relative z-10 text-sm font-semibold">
                      {speed.toFixed(1)}
                      <br />km/h
                    </span>
                  </div>
                </div>
                {/* Ride details */}
                <div className="md:col-span-3">
                  <h4 className="mb-1 text-lg font-semibold">
                    {new Date(ride.date).toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </h4>
                  <p className="text-sm opacity-80">{ride.description}</p>
                  <div className="mt-2 flex gap-4 text-xs">
                    <span>Distance: {ride.distance} km</span>
                    <span>Duration: {ride.duration} min</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </HoloPanel>
    </section>
  );
}
