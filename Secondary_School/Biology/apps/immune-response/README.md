# Immune Response Simulator

A high-fidelity educational simulation for HKDSE Biology students demonstrating Specific Immune Response (Humoral Immunity) and Vaccination principles.

## Features

### Interactive Simulation

- **Primary Infection Phase**: Demonstrates the initial immune response with clonal selection and plasma cell production
- **Secondary Infection Phase**: Shows the rapid memory cell response (vaccination principle)
- **Live Antibody Chart**: Real-time visualization of antibody concentration over time

### Educational Components

- **Lock and Key Model**: B-cells with different receptor shapes demonstrate specificity
- **Clonal Selection**: Visual highlighting of the matching B-cell
- **Agglutination**: Antibody-antigen binding visualization
- **Memory Response**: Dramatic difference between primary and secondary responses

### Cell Types Visualized

- **Pathogens**: Red spiked balls with specific antigens
- **Macrophage**: Antigen-presenting cell (green blob)
- **Helper T-Cell**: Immune response coordinator (blue)
- **B-Cells**: Three types with different receptors (purple)
- **Plasma Cells**: Antibody factories
- **Memory Cells**: Long-lived immunity cells
- **Antibodies**: Y-shaped proteins

## Technology Stack

- **React 19**: UI framework
- **Tailwind CSS**: Styling
- **Framer Motion**: Smooth animations
- **Recharts**: Data visualization
- **Lucide React**: Icons

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Educational Concepts Covered

1. **Specificity**: Lock and key model of antigen-antibody interaction
2. **Clonal Selection**: Activation of specific B-cells
3. **Cell Differentiation**: B-cells → Plasma cells + Memory cells
4. **Primary vs Secondary Response**: Demonstrates vaccination principle
5. **Immunological Memory**: Faster, stronger secondary response

## HKDSE Biology Curriculum Alignment

This simulator covers key topics in the HKDSE Biology curriculum:

- Specific immune response mechanisms
- Humoral immunity
- Vaccination and immunization principles
- Antibody production and function

## Usage Instructions

1. Click **"Primary Infection"** to start the first exposure
2. Watch the immune system respond (lag phase, clonal selection, antibody production)
3. Wait for memory cells to form
4. Click **"Secondary Infection (Re-exposure)"** to see the memory response
5. Compare the graph shapes - notice the faster, higher secondary response!
6. Click **"Reset"** to start over

## GitHub Pages Deployment

Built files are in the `dist/` directory. Configure GitHub Pages to serve from this directory.

Base URL is set to: `/Secondary_School/Biology/apps/immune-response/`
