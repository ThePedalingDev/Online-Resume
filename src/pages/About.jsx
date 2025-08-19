export default function About() {
  return (
    <section className="min-h-screen w-full bg-black overflow-hidden">
      <div className="relative w-full h-screen overflow-hidden [perspective:650px] flex items-end">
        {/* The fixed crawl window */}
        <div
          className="
            absolute left-1/2 bottom-0
            -translate-x-1/2
            w-[85vw] max-w-[900px] min-w-[260px]
            h-[80vh]
            overflow-hidden
            z-10
            box-border
            flex flex-col justify-end
            bg-transparent
          "
        >
          {/* The animated crawl content */}
          <div
            className="
              w-full
              mx-auto
              animate-starwars-crawl
              text-[#ffe81f]
              font-bold text-center tracking-wide
              [font-family:StarJedi,Arial_Black,Arial,sans-serif]
              [text-shadow:0_3px_6px_#000,0_0_32px_#ffe81f,0_0_12px_#000]
              [transform-origin:50%_100%]
              text-[clamp(1.18rem,2.1vw,2.2rem)]
              leading-[1.58]
            "
          >
           <div className="mb-[2.5vw] tracking-widest text-[clamp(2.3rem,5vw,3.3rem)] [font-family:StarJedi,Arial_Black,Arial,sans-serif] [text-shadow:0_6px_18px_#000,0_0_42px_#ffe81f,0_0_18px_#000]">
  ABOUT ME
</div>
<p className="mb-7">
  I’m Markus, a developer and cycling enthusiast based between South Africa and the UK. I’m currently completing my BSc in Information Technology, specialising in full-stack application development, and I love exploring new technologies and trends in the world of software engineering.  
</p>
<p className="mb-7">
  My skills range from frontend frameworks like <strong>React</strong> and <strong>TailwindCSS</strong> to backend stacks like <strong>ASP.NET Core</strong> and <strong>Node.js</strong>, with experience in databases such as <strong>PostgreSQL</strong> and <strong>SQL Server</strong>. I enjoy building things that are not only functional but also intuitive and elegant—whether it’s a charity website, an enterprise system, or a side project for cycling analytics.
</p>
<p className="mb-7">
  When I’m not coding, you’ll usually find me on my bike. Cycling is where I push myself physically and mentally—whether it’s training rides, races, or endurance events like the TransBaviaans. I often merge these two passions by building apps and tools that help me and others plan, track, and optimise performance.
</p>
<p>
  My long-term goal is to become a <strong>solutions architect</strong> or <strong>systems engineer</strong> at a leading tech company like Microsoft. I’m motivated by problem-solving, designing scalable architectures, and constantly learning. For me, both coding and cycling are about growth, resilience, and pushing boundaries—and I’m excited to see where the journey takes me.
</p>

          </div>
        </div>
      </div>
    </section>
  );
}
