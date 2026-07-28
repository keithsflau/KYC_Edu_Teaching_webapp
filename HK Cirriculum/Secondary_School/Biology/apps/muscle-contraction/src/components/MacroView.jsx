import React from 'react';
import { motion } from 'framer-motion';

const MacroView = ({ contraction }) => {
  // Physics / Anatomy Correction:
  // Viewing from the Left Side (Patient looking Left).
  // Anterior (Front) is Left. Posterior (Back) is Right.
  // Pivot at (100, 200).
  // 0 deg = Straight Down.
  // Positive Rotation = Clockwise (Swing Left ... wait, standard SVG rotation clockwise moves +Y to -X? No. +X to +Y.)
  // Let's standardise: 0 is Down (Y+).
  // To swing Left (-X), we need rotation.
  // In standard math (0=Right, 90=Down, 180=Left).
  // We want range: 90 (Down) -> 180 (Left) -> 220 (Up-Left).
  // SVG Rotate transform is usually degrees clockwise.
  // If we start with Group aligned Down (0 rot), then rotating +90 makes it point Left.
  // Range: 10 deg (Relaxed, slightly forward) to 120 deg (Flexed high).
  
  const rotation = 10 + (contraction / 100) * 110; 

  // Helper to calculate world coordinates of a point inside the rotating forearm group
  // Pivot is (100, 200).
  const getBonePoint = (lx, ly) => {
    const rad = (rotation * Math.PI) / 180;
    // Standard 2D rotation around 0,0 then translate
    // x' = x cos - y sin
    // y' = x sin + y cos
    // But SVG coord system: Y is down. +Rotation is Clockwise.
    // So:
    // nx = lx * cos(rad) - ly * sin(rad)
    // ny = lx * sin(rad) + ly * cos(rad)
    return {
      x: 100 + (lx * Math.cos(rad) - ly * Math.sin(rad)),
      y: 200 + (lx * Math.sin(rad) + ly * Math.cos(rad))
    };
  };

  // Defining Attachment Points (Local to their bones)
  // Biceps Origin: Humerus Front (Left side), high up.
  const bicepsOrigin = { x: 85, y: 70 };
  
  // Triceps Origin: Humerus Back (Right side), high up.
  const tricepsOrigin = { x: 115, y: 70 };

  // Biceps Insertion: Radius (Front/Left of forearm), slightly down shaft.
  // In unrotated group (pointing down): Left is -X. Down is +Y.
  const bicepsInsertionLocal = { x: -10, y: 30 }; 
  const bicepsIns = getBonePoint(bicepsInsertionLocal.x, bicepsInsertionLocal.y);

  // Triceps Insertion: Olecranon (Elbow tip).
  // This is the lever! It sticks out the BACK (Right side, +X) and UP (-Y relatively? No, it extends proximal to joint usually).
  // Let's simplified: Ideally behind the pivot.
  // In unrotated group: Right is +X.
  const tricepsInsertionLocal = { x: 18, y: -15 }; // Stick out back-right
  const tricepsIns = getBonePoint(tricepsInsertionLocal.x, tricepsInsertionLocal.y);

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 relative bg-blue-50/50 rounded-xl border border-blue-100">
      <div className="absolute top-4 left-4 bg-white/80 p-2 rounded shadow text-sm z-10 pointer-events-none">
        <h3 className="font-bold text-gray-800">Antagonistic Pair</h3>
        <p className="text-gray-600 text-xs">Left Arm (Side View)</p>
      </div>

      <div className="relative w-80 h-96">
        <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-xl overflow-visible">
          <defs>
            <linearGradient id="boneGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="muscleRed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="0" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill="#64748b" />
            </marker>
          </defs>

          {/* MAIN GROUP */}
          
            {/* HUMERUS (Fixed Upper Arm) */}
            <g>
              {/* Bone Shaft */}
              <rect x="85" y="50" width="30" height="160" rx="6" fill="url(#boneGradient)" stroke="#94a3b8" strokeWidth="2"/>
              <text x="75" y="100" className="text-[10px] fill-slate-400 font-bold -rotate-90 opacity-60">HUMERUS</text>
              {/* Shoulder joint hint */}
              <circle cx="100" cy="50" r="15" fill="#e2e8f0" stroke="#cbd5e1"/>
            </g>

            {/* FOREARM GROUP (Rotates) */}
            <g transform={`translate(100, 200) rotate(${rotation})`}>
               {/* Olecranon Process (The Lever for Triceps) */}
               {/* Sticks out 'back' (Right +X) and 'up' (-Y) relative to shaft */}
               <path d="M 0 0 L 15 -10 L 25 -5 L 15 20 Z" fill="url(#boneGradient)" stroke="#94a3b8" strokeWidth="2" strokeLinejoin="round" />
               
               {/* Main Radius/Ulna Shaft */}
               <rect x="-12" y="-10" width="24" height="140" rx="6" fill="url(#boneGradient)" stroke="#94a3b8" strokeWidth="2" />
               <text x="-4" y="80" className="text-[10px] fill-slate-400 font-bold rotate-90 opacity-60">RADIUS</text>
               
               {/* Hand */}
               <circle cx="0" cy="140" r="14" fill="#fecaca" stroke="#fca5a5" />
            </g>

            {/* PIVOT POINT (Elbow Joint) - Drawn over Forearm but under top layer details */}
            <circle cx="100" cy="200" r="8" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />

            {/* MUSCLES */}
            
            {/* BICEPS (Flexor - Ancior/Left) */}
            {/* Logic: Gets shorter and fatter as arm lifts */}
            <MusclePath 
               origin={bicepsOrigin} 
               insertion={bicepsIns} 
               controlOffset={-25 - (contraction/5)} // Bulges Left (-X)
               width={16 + (contraction/100)*18} // Thickens
               color="url(#muscleRed)"
               label="Biceps"
               isContracting={contraction > 20}
            />

            {/* TRICEPS (Extensor - Posterior/Right) */}
            {/* Connects to the Olecranon (tricepsIns) */}
            {/* Logic: Gets thinner and straighter as arm lifts (stretches) */}
            <MusclePath 
               origin={tricepsOrigin} 
               insertion={tricepsIns} 
               controlOffset={20 - (contraction/100)*15} // Bulges Right (+X), flattens when stretched
               width={24 - (contraction/100)*10} // Thins out
               color="#ef4444"
               opacity={0.85}
               label="Triceps"
               isContracting={false}
            />
            
        </svg>
      </div>

      {/* Labels / Educational Note */}
      <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-lg">
        <div className={`p-4 rounded-lg border transition-colors ${contraction > 50 ? 'bg-red-100 border-red-300' : 'bg-gray-50 border-gray-200'}`}>
          <h4 className="font-bold text-red-800">Biceps</h4>
          <p className="text-sm text-gray-700">Status: {contraction > 10 ? <strong>Contracting</strong> : "Relaxed"}</p>
          <div className="text-xs mt-1 text-gray-500">Flexor Muscle</div>
        </div>
        <div className={`p-4 rounded-lg border transition-colors ${contraction < 50 ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'}`}>
          <h4 className="font-bold text-blue-800">Triceps</h4>
          <p className="text-sm text-gray-700">Status: {contraction < 90 ? <strong>Relaxing</strong> : "Stretched"}</p>
          <div className="text-xs mt-1 text-gray-500">Extensor Muscle</div>
        </div>
      </div>
    </div>
  );
};

// Reusable Muscle Path Component
const MusclePath = ({ origin, insertion, controlOffset, width, color, opacity = 1 }) => {
  // Calculate Control Point (Midpoint + Offset)
  const mx = (origin.x + insertion.x) / 2;
  const my = (origin.y + insertion.y) / 2;
  
  // Calculate perpendicular normal or just straightforward X-offset?
  // Since our arm is vertical-ish, X-offset is robust enough for "Left/Right" bulge.
  const cx = mx + controlOffset;
  const cy = my;

  return (
    <g>
       <motion.path 
        d={`M ${origin.x} ${origin.y} Q ${cx} ${cy} ${insertion.x} ${insertion.y}`}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        fill="none"
        opacity={opacity}
        initial={false}
        animate={{ 
          d: `M ${origin.x} ${origin.y} Q ${cx} ${cy} ${insertion.x} ${insertion.y}`,
          strokeWidth: width
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      {/* Label on the belly */}
      {/* <text x={cx} y={cy} textAnchor="middle" className="text-[10px] fill-white font-bold opacity-80 pointer-events-none">{label}</text> */}
    </g>
  );
};

export default MacroView;
