
export const generateGametes = (genotype, mode) => {
    if (!genotype) return [];

    if (mode === 'sex') {
        // Mode expected formats: "XRY", "XrY", "XRXR", "XRXr", "XrXr"
        // Normalize logic handled by UI mostly, but here we parse.
        // Clean string
        const g = genotype.replace(/\s/g, '');

        // Check patterns
        // Mother: X?X?
        if (g.length === 4 && g.startsWith('X') && g[2] === 'X') {
            return [g.slice(0, 2), g.slice(2, 4)];
        }
        // Father: X?Y
        if (g.length === 3 && g.startsWith('X') && g[2] === 'Y') {
            return [g.slice(0, 2), 'Y'];
        }

        // Attempt custom parse if format is "XR,Xr" logic?
        // Let's stick to rigid inputs for now.
        return [];
    }

    // Autosomal
    // Monohybrid: 'Aa' -> ['A', 'a']
    if (genotype.length === 2) {
        return [genotype[0], genotype[1]];
    }

    // Dihybrid: 'AaBb' -> ['AB', 'Ab', 'aB', 'ab']
    else if (genotype.length === 4) {
        const trait1 = [genotype[0], genotype[1]];
        const trait2 = [genotype[2], genotype[3]];
        const gametes = [];
        trait1.forEach(t1 => {
            trait2.forEach(t2 => {
                gametes.push(t1 + t2);
            });
        });
        return gametes;
    }
    return [];
};

export const combineAlleles = (g1, g2, mode) => {
    if (mode === 'sex') {
        // g1, g2 could be 'XR', 'Xr', 'Y'
        const isY1 = g1 === 'Y';
        const isY2 = g2 === 'Y';

        // If YY (impossible usually but logic handles it)
        if (isY1 && isY2) return 'YY';

        // If one is Y, other is X?
        // Standard: XX then XY
        // Also order alleles: Dominant (R) before Recessive (r)

        // Helper to get allele from 'XR' -> 'R'
        const getAllele = (g) => g.length > 1 ? g[1] : '';

        // Case: XY
        if (isY1 || isY2) {
            const x = isY1 ? g2 : g1;
            const y = isY1 ? g1 : g2; // 'Y'
            return x + y; // e.g., XRY
        }

        // Case: XX
        // Sort XR vs Xr
        // 'R' < 'r' in ascii? 'R'(82) < 'r'(114). Yes.
        // So simple sort works for XR vs Xr
        const arr = [g1, g2].sort();
        return arr[0] + arr[1]; // e.g. XRXR or XRXr
    }

    // Autosomal
    // Monohybrid
    if (g1.length === 1 && g2.length === 1) {
        const arr = [g1, g2].sort();
        return arr[0] + arr[1];
    }

    // Dihybrid
    if (g1.length === 2 && g2.length === 2) {
        // g1=AB, g2=ab
        // Trait 1: g1[0] and g2[0]
        const t1 = [g1[0], g2[0]].sort().join('');
        // Trait 2: g1[1] and g2[1]
        const t2 = [g1[1], g2[1]].sort().join('');
        return t1 + t2;
    }

    return g1 + g2;
};

export const solvePunnett = (p1Gametes, p2Gametes, mode) => {
    const grid = [];
    for (let g1 of p1Gametes) {
        const row = [];
        for (let g2 of p2Gametes) {
            row.push(combineAlleles(g1, g2, mode));
        }
        grid.push(row);
    }
    return grid;
};

export const analyzeRatios = (grid, mode) => {
    const flat = grid.flat();
    const total = flat.length;
    const genoCounts = {};
    flat.forEach(g => genoCounts[g] = (genoCounts[g] || 0) + 1);

    // Phenotypes
    const phenoCounts = {};

    flat.forEach(geno => {
        let phenoLabel = '';
        if (mode === 'sex') {
            // Check for Y
            const hasY = geno.includes('Y');
            const hasRecessive = geno.includes('r');
            const hasDominant = geno.includes('R');

            const sex = hasY ? 'Male' : 'Female';
            let trait = '';

            if (hasY) {
                // Male: XRY (Normal/Dom) or XrY (Affected/Rec)
                // Assuming R=Dominant (Normal?), r=Recessive (Affected)
                // Or user defined. Standard: R=Dom, r=Rec
                trait = hasDominant ? 'Dominant' : 'Recessive';
            } else {
                // Female: XRXR, XRXr, XrXr
                if (hasDominant) {
                    trait = 'Dominant'; // Carrier is phenotypically dominant usually
                } else {
                    trait = 'Recessive';
                }
            }
            phenoLabel = `${sex} ${trait}`;
        } else {
            // Autosomal
            // Check Monohybrid vs Dihybrid
            if (geno.length === 2) {
                // Monohybrid
                // Dom if has Capital
                const hasCap = /[A-Z]/.test(geno);
                phenoLabel = hasCap ? 'Dominant' : 'Recessive';
            } else {
                // Dihybrid
                // Trait 1
                const t1 = geno.slice(0, 2);
                const t2 = geno.slice(2, 4);
                const p1 = /[A-Z]/.test(t1) ? 'Dom1' : 'Rec1';
                const p2 = /[A-Z]/.test(t2) ? 'Dom2' : 'Rec2';
                phenoLabel = `${p1}-${p2}`;
            }
        }
        phenoCounts[phenoLabel] = (phenoCounts[phenoLabel] || 0) + 1;
    });

    return { genoCounts, phenoCounts, total };
};
