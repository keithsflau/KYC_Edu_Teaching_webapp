# 🌱 Energy Flow in Ecosystems - Interactive Educational Tool

An interactive, scientifically accurate educational application for HKDSE Biology students to understand **Energy Flow in Ecosystems**, **Trophic Levels**, and **Ecological Pyramids**.

## 🎯 Features

### 1. Food Chain Simulator

- **4 Trophic Levels**: Producer → Primary Consumer → Secondary Consumer → Tertiary Consumer
- **The 10% Law Implementation**:
  - Producers fix only ~1% of solar energy (Gross Primary Production)
  - 60-90% energy loss as heat through respiration at each level
  - Only ~10% energy transfer to the next trophic level
- **Animated Particle Flow**: Visual demonstration of energy flowing through levels with 90% escaping as heat
- **Real-time Calculations**: Instant updates when solar input changes

### 2. Pyramid Builder

- **Three Pyramid Types**:

  - ⚡ **Pyramid of Energy** (always upright)
  - 🔢 **Pyramid of Numbers** (can be inverted)
  - ⚖️ **Pyramid of Biomass** (can be inverted in aquatic ecosystems)

- **Three Ecosystem Scenarios**:
  - **Standard Grassland**: All pyramids upright (Grass → Rabbit → Fox → Eagle)
  - **Parasitic Tree**: Inverted Number Pyramid (1 Oak → 500 Caterpillars → 20 Birds)
  - **Aquatic**: Inverted Biomass Pyramid (Phytoplankton turnover rate demonstration)

### 3. Educational Features

- ⚠️ **Energy Limit Warnings**: Shows when insufficient energy prevents higher trophic levels
- 🔥 **Heat Loss Labels**: Clearly marks respiration energy losses
- 📚 **HKDSE-Focused Annotations**: Explains key concepts for exam preparation

## 🛠️ Tech Stack

- **React** - Interactive UI components
- **Tailwind CSS** - Earthy, educational styling
- **Recharts** - Pyramid visualizations (horizontal bar charts)
- **Framer Motion** - Smooth particle animations for energy flow
- **Vite** - Fast development and optimized builds

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
```

The production files will be in the `dist/` directory, ready for GitHub Pages deployment.

## 📖 Key HKDSE Biology Concepts Covered

1. **The 10% Law**: Energy transfer efficiency between trophic levels
2. **GPP and NPP**: Gross vs Net Primary Production
3. **Respiration Losses**: Why energy decreases dramatically at each level
4. **Food Chain Length Limits**: Why chains rarely exceed 4-5 levels
5. **Inverted Pyramids**:
   - Numbers: Parasitic relationships (many small consumers on one large producer)
   - Biomass: Aquatic ecosystems (high phytoplankton turnover rate)

## 🎨 Design Philosophy

- **Earthy Color Palette**: Greens, browns, and organic tones for ecological theme
- **Clear Visual Hierarchy**: Easy to understand trophic level relationships
- **Interactive Learning**: Hands-on exploration of energy flow concepts
- **Scientifically Accurate**: Based on ecological research and HKDSE curriculum

## 📱 Responsive Design

Fully responsive layout optimized for:

- Desktop computers
- Tablets
- Mobile devices

## 🌟 Educational Impact

This tool helps students:

- ✅ Visualize abstract energy flow concepts
- ✅ Understand why food chains have limited length
- ✅ Recognize different types of ecological pyramids
- ✅ Identify exceptional cases (inverted pyramids)
- ✅ Prepare effectively for HKDSE Biology exams

## 📄 License

Created for educational purposes - HKDSE Biology students.

---

**Built with 💚 for HKDSE Biology Education**
