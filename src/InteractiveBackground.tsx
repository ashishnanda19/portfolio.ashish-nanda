import React, { useState } from 'react';

interface DoodleHotspot {
  id: number;
  quote: string;
  position: {
    top: string; // percentage
    left: string; // percentage
    width: string; // percentage
    height: string; // percentage
  };
}

const doodles: DoodleHotspot[] = [
  {
    id: 1,
    quote: "I design backends like I compose music: every microservice must be in perfect harmony.",
    position: {
      top: "5%",
      left: "5%",
      width: "30%",
      height: "40%"
    }
  },
  {
    id: 2,
    quote: "Finding the shortest path in a graph feels exactly like nailing a complex guitar solo.",
    position: {
      top: "5%",
      left: "35%",
      width: "30%",
      height: "40%"
    }
  },
  {
    id: 3,
    quote: "My flow state exists somewhere between optimizing O(n) complexity and shredding the pentatonic scale.",
    position: {
      top: "5%",
      left: "65%",
      width: "30%",
      height: "40%"
    }
  },
  {
    id: 4,
    quote: "Backend architecture is the rhythm section; algorithms are the lead guitar.",
    position: {
      top: "45%",
      left: "10%",
      width: "35%",
      height: "45%"
    }
  },
  {
    id: 5,
    quote: "I handle string manipulation in my code and string bending on my fretboard.",
    position: {
      top: "45%",
      left: "50%",
      width: "35%",
      height: "45%"
    }
  }
];

const InteractiveBackground: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      {/* Background Image */}
      <img 
        src="/background.png" 
        className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none"
        alt="Interactive Background" 
      />
      
      {/* Hotspot Overlay Container */}
      <div className="absolute inset-0 w-full h-full">
        {doodles.map((doodle) => (
          <div
            key={doodle.id}
            className="absolute cursor-pointer group"
            style={{
              top: doodle.position.top,
              left: doodle.position.left,
              width: doodle.position.width,
              height: doodle.position.height,
            }}
            onMouseEnter={() => setHoveredId(doodle.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Invisible hover zone - make sure it fills the area */}
            <div className="w-full h-full bg-transparent" />
            
            {/* Speech Bubble Cloud Tooltip - positioned based on character location */}
            {/* Lower doodles (4, 5) show tooltip above, upper doodles (1, 2, 3) show below */}
            {doodle.id >= 4 ? (
              // Lower doodles - tooltip above
              <div 
                className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-0.5 z-[40] transition-all duration-300 ease-out ${
                  hoveredId === doodle.id 
                    ? 'opacity-100 scale-100 pointer-events-auto' 
                    : 'opacity-0 scale-90 pointer-events-none'
                }`}
                style={{ maxWidth: '340px', minWidth: '280px' }}
              >
                {/* Cloud-shaped speech bubble with multiple rounded sections */}
                <div className="relative bg-white/98 backdrop-blur-lg rounded-[2.5rem] p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] border-2 border-white/40">
                  {/* Cloud decoration bubbles around edges */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-white/98 rounded-full border-2 border-white/40 shadow-lg"></div>
                  <div className="absolute -top-2 -right-4 w-7 h-7 bg-white/98 rounded-full border-2 border-white/40 shadow-lg"></div>
                  <div className="absolute top-1 right-10 w-5 h-5 bg-white/98 rounded-full border-2 border-white/40"></div>
                  <div className="absolute -bottom-2 left-8 w-6 h-6 bg-white/98 rounded-full border-2 border-white/40"></div>
                  <div className="absolute top-2 -left-1 w-4 h-4 bg-white/98 rounded-full border-2 border-white/40"></div>
                  
                  {/* Quote text with better typography */}
                  <p className="text-gray-900 text-sm leading-relaxed font-medium relative z-10 tracking-wide">
                    "{doodle.quote}"
                  </p>
                  
                  {/* Speech bubble tail pointing down - cloud style */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        d="M14 20C9 20 5 15 0 10C5 10 9 5 14 5C19 5 23 10 28 10C23 15 19 20 14 20Z" 
                        fill="white" 
                        fillOpacity="0.98"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="2"
                      />
                      {/* Small cloud bubble on tail */}
                      <circle cx="10" cy="12" r="3" fill="white" fillOpacity="0.98" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                      <circle cx="18" cy="12" r="3" fill="white" fillOpacity="0.98" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              // Upper doodles - tooltip below
              <div 
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-[40] transition-all duration-300 ease-out ${
                  hoveredId === doodle.id 
                    ? 'opacity-100 scale-100 pointer-events-auto' 
                    : 'opacity-0 scale-90 pointer-events-none'
                }`}
                style={{ maxWidth: '340px', minWidth: '280px' }}
              >
                {/* Cloud-shaped speech bubble with multiple rounded sections */}
                <div className="relative bg-white/98 backdrop-blur-lg rounded-[2.5rem] p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] border-2 border-white/40">
                  {/* Cloud decoration bubbles around edges */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-white/98 rounded-full border-2 border-white/40 shadow-lg"></div>
                  <div className="absolute -top-2 -right-4 w-7 h-7 bg-white/98 rounded-full border-2 border-white/40 shadow-lg"></div>
                  <div className="absolute top-1 right-10 w-5 h-5 bg-white/98 rounded-full border-2 border-white/40"></div>
                  <div className="absolute -bottom-2 left-8 w-6 h-6 bg-white/98 rounded-full border-2 border-white/40"></div>
                  <div className="absolute top-2 -left-1 w-4 h-4 bg-white/98 rounded-full border-2 border-white/40"></div>
                  
                  {/* Quote text with better typography */}
                  <p className="text-gray-900 text-sm leading-relaxed font-medium relative z-10 tracking-wide">
                    "{doodle.quote}"
                  </p>
                  
                  {/* Speech bubble tail pointing up - cloud style */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-1">
                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
                      <path 
                        d="M14 20C9 20 5 15 0 10C5 10 9 5 14 5C19 5 23 10 28 10C23 15 19 20 14 20Z" 
                        fill="white" 
                        fillOpacity="0.98"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="2"
                      />
                      {/* Small cloud bubble on tail */}
                      <circle cx="10" cy="12" r="3" fill="white" fillOpacity="0.98" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                      <circle cx="18" cy="12" r="3" fill="white" fillOpacity="0.98" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveBackground;

