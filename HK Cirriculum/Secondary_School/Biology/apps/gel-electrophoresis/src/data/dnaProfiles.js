export const CRIME_SAMPLES = {
  crime_scene: { 
    id: "crime_scene",
    name: "Crime Scene DNA", 
    color: "bg-red-500", 
    fragments: [1200, 800, 450, 200] 
  },
  suspect_a: { 
    id: "suspect_a",
    name: "Suspect A", 
    color: "bg-blue-500", 
    fragments: [1200, 850, 450, 200] 
  },
  suspect_b: { 
    id: "suspect_b",
    name: "Suspect B", 
    color: "bg-green-500", 
    fragments: [1200, 800, 450, 200] 
  },
  suspect_c: { 
    id: "suspect_c",
    name: "Suspect C", 
    color: "bg-yellow-500", 
    fragments: [1100, 800, 500, 200] 
  },
};

export const PATERNITY_SAMPLES = {
  mother: { 
    id: "mother",
    name: "Mother", 
    color: "bg-pink-400", 
    fragments: [1000, 600, 300] 
  },
  child: { 
    id: "child",
    name: "Child", 
    color: "bg-purple-500", 
    fragments: [1000, 750, 400, 300] 
    // 1000 matches Mother
    // 750 ?
    // 400 ?
    // 300 matches Mother
    // Need Dad to have 750 and 400
  },
  dad_a: { 
    id: "dad_a",
    name: "Potential Dad A", 
    color: "bg-indigo-500", 
    fragments: [900, 750, 400, 200] // Matches 750, 400
  },
  dad_b: { 
    id: "dad_b",
    name: "Potential Dad B", 
    color: "bg-teal-500", 
    fragments: [900, 600, 400, 100] // Matches 400, but not 750. 600 matches mom (irrelevant since child inherits from one). 
    // Wait, child 300 from mom. Child 1000 from mom. 
    // Child 750 & 400 must come from Dad.
  },
};
