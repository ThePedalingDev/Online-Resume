import React, { useState, useContext, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5,
  faCss3Alt,
  faReact,
  faNodeJs,
  faPython,
  faGitAlt,
  faDocker,
  faSass,
  faGithub,
  faMicrosoft,
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase,
  faServer,
  faCodeBranch,
  faFlask,
  faFeather,
  faCogs,
  faCube,
  faCloud,
  faLock,
  faUserShield,
  faFire,
  faMobileAlt,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

import { ThemeContext } from '../context/ThemeContext.jsx';
import { skillTree } from '../data/skills.js';

const iconMap = {
  faHtml5,
  faCss3Alt,
  faReact,
  faNodeJs,
  faPython,
  faGitAlt,
  faDocker,
  faSass,
  faFeather,
  faDatabase,
  faServer,
  faCodeBranch,
  faFlask,
  faCogs,
  faCube,
  // icons used in data/skills.js
  faGithub,
  faMicrosoft,
  faCloud,
  faLock,
  faUserShield,
  faFire,
  faMobileAlt,
  faStar,
};

const NODE_WIDTH = 140;
const NODE_HEIGHT = 80;
const H_SPACING = 80;
const V_SPACING = 120;

function createPath(from, to) {
  const startX = from.x + NODE_WIDTH / 2;
  const startY = from.y + NODE_HEIGHT;
  const endX = to.x + NODE_WIDTH / 2;
  const endY = to.y;

  const cp1 = { x: startX, y: startY + V_SPACING / 2 };
  const cp2 = { x: endX, y: endY - V_SPACING / 2 };

  return `M${startX},${startY} C${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${endX},${endY}`;
}

// Simple drag hook for panning
function useDrag(ref) {
  const pos = React.useRef({ x: 0, y: 0 });
  const origin = React.useRef({ x: 0, y: 0 });
  const dragging = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onMouseDown(e) {
      dragging.current = true;
      origin.current = { x: e.clientX, y: e.clientY };
      el.style.cursor = 'grabbing';
      e.preventDefault();
    }

    function onMouseMove(e) {
      if (!dragging.current) return;
      const dx = e.clientX - origin.current.x;
      const dy = e.clientY - origin.current.y;
      pos.current = { x: pos.current.x + dx, y: pos.current.y + dy };
      origin.current = { x: e.clientX, y: e.clientY };
      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      e.preventDefault();
    }

    function onMouseUp() {
      dragging.current = false;
      el.style.cursor = 'grab';
    }

    el.style.cursor = 'grab';
    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [ref]);

  return pos.current;
}

export default function SkillTree() {
  const { theme } = useContext(ThemeContext);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const category = skillTree[currentPage];

  // Calculate positions for all skills (show locked and unlocked, like original)
  const skillsWithPos = category.skills.map((skill) => ({
    ...skill,
    x: skill.branch * (NODE_WIDTH + H_SPACING),
    y: skill.level * (NODE_HEIGHT + V_SPACING) + 50,
  }));

  // Create position map for connections
  const posMap = {};
  skillsWithPos.forEach((s) => (posMap[s.id] = s));

  // Create connection lines
  const lines = [];
  skillsWithPos.forEach((skill) => {
    if (skill.status === 'unlocked' && skill.connections.length) {
      skill.connections.forEach((connId) => {
        const target = posMap[connId];
        if (target && target.status === 'unlocked') {
          lines.push(
            <path
              key={`${skill.id}-${connId}`}
              d={createPath(skill, target)}
              stroke={theme === 'jedi' ? '#3fb0f7' : '#e63946'}
              strokeWidth={3}
              fill='none'
              strokeLinecap='round'
              style={{ filter: `drop-shadow(0 0 5px ${theme === 'jedi' ? '#3fb0f7' : '#e63946'})` }}
            />
          );
        }
      });
    }
  });

  const containerRef = React.useRef(null);
  useDrag(containerRef);

  return (
    <section className="min-h-screen pt-24 md:pt-36 pb-12 px-4 font-mono bg-black/90 text-white flex flex-col">
      {/* Pagination */}
      <div className="w-full max-w-6xl mx-auto flex justify-center gap-4 mb-6">
        {skillTree.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelected(null);
              setCurrentPage(idx);
              if(containerRef.current) containerRef.current.style.transform = 'translate(0, 0)'; // Reset pan on page switch
            }}
            className={`px-4 py-2 rounded-md font-bold uppercase tracking-wide transition ${
              idx === currentPage
                ? theme === 'jedi'
                  ? 'bg-blue-500 text-black'
                  : 'bg-red-700 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Main layout: Tree and details */}
      <div className="flex max-w-7xl mx-auto gap-10 flex-grow">
        {/* Skill tree container with drag-pan */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            minWidth: 600,
            minHeight: 400,
            maxWidth: '60vw',
            maxHeight: '70vh',
            overflow: 'visible',
            cursor: 'grab',
          }}
          className="rounded-lg p-10 bg-black/50 shadow-inner backdrop-blur-md "
        >
          <h2 className="absolute top-4 left-0 w-full text-center text-xl font-semibold tracking-widest text-yellow-300 uppercase select-none z-10">
            {category.name}
          </h2>

          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
              overflow: 'visible',
            }}
          >
            {lines}
          </svg>

          {skillsWithPos.map((skill) => {
            const isSelected = selected?.id === skill.id;
            const isUnlocked = skill.status === 'unlocked';

            return (
              <div
                key={skill.id}
                onClick={() => isUnlocked && setSelected(skill)}
                title={`${skill.name} (${skill.level})`}
                className={`absolute flex flex-col cursor-${
                  isUnlocked ? 'pointer' : 'not-allowed'
                } rounded-lg p-4 w-[140px] h-[80px] ${
                  isUnlocked
                    ? 'bg-yellow-400 text-black shadow-[0_0_15px_5px_rgba(255,229,102,0.8)]'
                    : 'bg-gray-600 text-gray-300'
                } ${isSelected ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-black' : ''}`}
                style={{ top: skill.y, left: skill.x, fontWeight: 'bold' }}
              >
                <div className="flex items-center gap-3 mb-1 break-words">
                  <FontAwesomeIcon icon={iconMap[skill.icon]} size="2x" />
                  <span className="font-semibold break-words">{skill.name}</span>
                </div>
                <small className="text-xs font-normal opacity-80">{skill.level}</small>
              </div>
            );
          })}
        </div>

        {/* Skill details */}
        <div className="w-96 rounded-lg p-6 bg-black/50 shadow-inner backdrop-blur-md border border-yellow-400 select-text flex-shrink-0">
          {selected ? (
            <>
              <h3 className="mb-2 text-yellow-300 uppercase tracking-wide font-semibold">{selected.name}</h3>
              <p className="whitespace-pre-line">{selected.description}</p>
              <p className="mt-3 text-xs opacity-80">Level: {selected.level}</p>
            </>
          ) : (
            <p className="text-gray-400 select-none">Select a skill node to see details</p>
          )}
        </div>
      </div>
    </section>
  );
}
