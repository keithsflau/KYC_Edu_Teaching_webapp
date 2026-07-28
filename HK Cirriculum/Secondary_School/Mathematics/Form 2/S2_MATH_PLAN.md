# Form 2 Mathematics Interactive Applications Plan

This document outlines the development plan for 30 interactive web applications for the Form 2 Mathematics curriculum (HKDSE aligned).
Current Status: Planning Phase

## Tech Stack

- **Core:** HTML5, Tailwind CSS
- **Logic:** React (CDN), Babel, JavaScript (ES6+)
- **Visuals:** Canvas API, Chart.js (for stats), FontAwesome Icons
- **Theme:** "Bright Math" - Clean, white/slate backgrounds with vibrant accent colors (Cyan, Rose, Amber) to represent logic and precision.

## Application List

### Unit 4: Algebra & Estimation

1. **01_Estimation_Err**: `Estimation & Error` - Visualizing Absolute, Relative, and Percentage Errors.
2. **02_Sig_Figs**: `Significant Figures` - Tool to round numbers and check significant figures.
3. **03_Sci_Notation**: `Scientific Notation` - Zooming in/out of power of 10 scales.
4. **04_Poly_Ops**: `Polynomials Lab` - Visual addition/subtraction of algebraic terms.
5. **05_Expand_Algebra**: `Expansion Visualizer` - Area model for expanding $(a+b)(c+d)$.
6. **06_Factor_Slide**: `Factorization Slider` - Reverse area model for factorization.
7. **07_Alg_Fractions**: `Fraction Simplifier` - Canceling common factors in algebraic fractions.
8. **08_Linear_Eq_2**: `Simultaneous Equations` - Graphical intersection of two lines.
9. **09_Linear_Ineq**: `Inequality Number Line` - Graphing $x > 3$, $x \le -2$ on a number line.
10. **10_Formula_Change**: `Subject Changer` - Drag and drop algebra steps to change subject.
11. **11_Identities**: `Identity Prover` - Visual proof of $(a+b)^2 = a^2 + 2ab + b^2$.

### Unit 5: Geometry (Deductive) & Measures

12. **12_Polygon_Angles**: `Polygon Sum` - Regular/Irregular polygon angle sum explorer.
13. **13_Congruence**: `Congruence Tests` - SSS, SAS, ASA, RHS interactive triangles.
14. **14_Similarity**: `Similarity Zoom` - Scaling factors and similar triangles.
15. **15_Pythagoras_Proof**: `Pythagoras Proof` - Visual square rearrangement proof.
16. **16_Pythagoras_Calc**: `Ladder & Wall` - Real-world Pythagoras problems (Ladder sliding).
17. **17_Intro_Trig**: `Trig Ratios` - SOH CAH TOA visualizer on a right-angled triangle.
18. **18_Trig_Slope**: `Slope & Tangent` - Relating gradient to tan(theta).
19. **19_Trig_Heights**: `Clinometer Sim` - Measuring height of a building using angles.
20. **20_Circle_Area**: `Circle Sector` - Area of sector and arc length calculator.
21. **21_Cylinder_Vol**: `Cylinder Explorer` - Surface area (net) and volume of cylinders.
22. **22_Bearings**: `Compass Bearings` - Interactive map for True Bearing vs Compass Bearing.

### Unit 6: Data Handling

23. **23_Pie_Chart**: `Pie Chart Creator` - Input data to generate angles and sectors.
24. **24_Histograms**: `Histogram Builder` - Grouped frequency data visualization.
25. **25_Freq_Polygon**: `Frequency Polygon` - overlay on histograms.
26. **26_Cum_Freq**: `Cumulative Curve` - Ogive curve and Median/Quartiles finder.
27. **27_Central_Tendency**: `Mean Median Mode` - Effect of outliers on averages.
28. **28_Probability**: `Probability Spinner` - Theoretical vs Experimental probability simulation.
29. **29_Rate_Ratio_2**: `Rate Problems` - Speed, Distance, Time interactive travel graphs.
30. **30_Deductive_Logic**: `Logic Steps` - Step-by-step geometric proof builder game.

## Development Guidelines

- All apps must be contained in a single `index.html`.
- Use `React` and `Tailwind CSS`.
- Ensure mobile responsiveness.
- **Strictly English** interface for S2 Math (English Medium).
