export const MOLECULE_TYPES = {
    OXYGEN: { color: '#3B82F6', radius: 4, label: 'O2', mass: 1 },
    GLUCOSE: { color: '#22C55E', radius: 6, label: 'Glucose', mass: 5 },
    WATER: { color: '#A5F3FC', radius: 3, label: 'H2O', mass: 1 }, // White might be hard to see on light bg, using light cyan
    SODIUM: { color: '#EF4444', radius: 4, label: 'Na+', mass: 2 },
};

export const MODES = {
    SIMPLE: 'simple',
    FACILITATED: 'facilitated',
    OSMOSIS: 'osmosis',
    ACTIVE: 'active',
};

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 400;
export const MEMBRANE_WIDTH = 40;

export const GATES = {
    CHANNEL: { start: 80, end: 140, type: 'channel' },    // For Glucose
    PUMP: { start: 180, end: 240, type: 'pump' },         // For Na+
    AQUAPORIN: { start: 280, end: 340, type: 'aquaporin' }// For Water
};
