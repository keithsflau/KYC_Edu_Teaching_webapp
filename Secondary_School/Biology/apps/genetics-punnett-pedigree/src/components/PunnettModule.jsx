
import React, { useState, useEffect } from 'react';
import { generateGametes, solvePunnett, analyzeRatios } from '../utils/genetics';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FlaskConical, Calculator, Info } from 'lucide-react';
import clsx from 'clsx';

const COLORS = ['#0ea5e9', '#ef4444', '#22c55e', '#eab308'];

export default function PunnettModule() {
    const [mode, setMode] = useState('mono'); // 'mono', 'di', 'sex'

    // Inputs
    const [p1, setP1] = useState('Aa'); // General Parent 1 (or Mother for sex)
    const [p2, setP2] = useState('Aa'); // General Parent 2 (or Father for sex)

    // Explicit sex-linked states to switch easy
    const [motherSex, setMotherSex] = useState('XRXr');
    const [fatherSex, setFatherSex] = useState('XRY');

    const [results, setResults] = useState(null);

    useEffect(() => {
        let g1 = [], g2 = [];
        let currentMode = mode;

        if (mode === 'sex') {
            g1 = generateGametes(motherSex, 'sex');
            g2 = generateGametes(fatherSex, 'sex');
        } else {
            g1 = generateGametes(p1, mode); // p1 is row (top?) usually p1 on side, p2 on top
            g2 = generateGametes(p2, mode);
        }

        if (g1.length > 0 && g2.length > 0) {
            const grid = solvePunnett(g1, g2, mode);
            const stats = analyzeRatios(grid, mode);
            setResults({ g1, g2, grid, stats });
        } else {
            setResults(null);
        }
    }, [mode, p1, p2, motherSex, fatherSex]);

    const handleModeChange = (m) => {
        setMode(m);
        if (m === 'mono') { setP1('Aa'); setP2('Aa'); }
        if (m === 'di') { setP1('AaBb'); setP2('aabb'); }
    };

    const renderSquare = (genotype) => {
        // Styling
        // Detect Dominant/Recessive for color coding?
        let bgColor = 'bg-white';
        if (mode === 'sex') {
            if (genotype.includes('r') && !genotype.includes('R')) bgColor = 'bg-red-50'; // Recessive affected?
            if (genotype.includes('R')) bgColor = 'bg-blue-50'; // Dominant
        } else {
            const hasDom = /[A-Z]/.test(genotype);
            bgColor = hasDom ? 'bg-blue-50' : 'bg-red-50';
        }

        return (
            <div className={clsx("flex items-center justify-center border p-4 text-base md:text-xl font-mono font-bold transition-colors hover:scale-105 transform duration-150 cursor-pointer shadow-sm", bgColor)}>
                {formatGenotype(genotype)}
            </div>
        );
    };

    const formatGenotype = (g) => {
        // Format superscripts for Sex linked
        if (g.includes('X') || g.includes('Y')) {
            return (
                <span>
                    {g.split('').map((char, i, arr) => {
                        if (char === 'X' || char === 'Y') return <span key={i}>{char}</span>;
                        // Superscript the letter following X
                        // Actually logic is: X followed by R or r
                        // My gamete logic keeps them as 'XR' string.
                        // But here g is joined e.g. XRXr
                        return null;
                    })}
                    {/* Parsing properly for rendering */}
                    {renderSexGenotype(g)}
                </span>
            )
        }
        return g;
    };

    const renderSexGenotype = (text) => {
        // Regex to split X/Y and their superscripts
        // e.g. XR Xr -> X^R X^r
        // Simple parse loops check
        const parts = [];
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === 'X') {
                // Next might be R or r
                const next = text[i + 1];
                parts.push(<span key={i}>X<sup>{next}</sup></span>);
                i++;
            } else if (char === 'Y') {
                parts.push(<span key={i}>Y</span>);
            }
        }
        return parts;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-scientific-600" />
                    Punnett Calculator
                </h2>
                <div className="flex bg-slate-200 rounded-lg p-1">
                    {['mono', 'di', 'sex'].map(m => (
                        <button
                            key={m}
                            onClick={() => handleModeChange(m)}
                            className={clsx(
                                "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                                mode === m ? "bg-white text-scientific-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
                            )}
                        >
                            {m === 'mono' ? 'Monohybrid' : m === 'di' ? 'Dihybrid' : 'Sex-Linked'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 grid lg:grid-cols-2 gap-8">
                {/* Input & Grid Section */}
                <div className="space-y-6">
                    <div className="flex gap-4 items-end bg-slate-50 p-4 rounded-lg border border-slate-100">
                        {mode === 'sex' ? (
                            <>
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Mother (XX)</label>
                                    <select
                                        value={motherSex}
                                        onChange={(e) => setMotherSex(e.target.value)}
                                        className="w-full p-2 border rounded-md font-mono"
                                    >
                                        <option value="XRXR">XRXR (Homo Dom)</option>
                                        <option value="XRXr">XRXr (Carrier)</option>
                                        <option value="XrXr">XrXr (Affected)</option>
                                    </select>
                                </div>
                                <div className="flex items-center pb-3 text-slate-400">x</div>
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Father (XY)</label>
                                    <select
                                        value={fatherSex}
                                        onChange={(e) => setFatherSex(e.target.value)}
                                        className="w-full p-2 border rounded-md font-mono"
                                    >
                                        <option value="XRY">XRY (Normal)</option>
                                        <option value="XrY">XrY (Affected)</option>
                                    </select>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Parent 1</label>
                                    <input
                                        type="text"
                                        value={p1}
                                        onChange={(e) => setP1(e.target.value)}
                                        className="w-full p-2 border rounded-md font-mono text-center uppercase"
                                        placeholder={mode === 'di' ? "AaBb" : "Aa"}
                                        maxLength={mode === 'di' ? 4 : 2}
                                    />
                                </div>
                                <div className="flex items-center pb-3 text-slate-400">x</div>
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Parent 2</label>
                                    <input
                                        type="text"
                                        value={p2}
                                        onChange={(e) => setP2(e.target.value)}
                                        className="w-full p-2 border rounded-md font-mono text-center uppercase"
                                        placeholder={mode === 'di' ? "AaBb" : "Aa"}
                                        maxLength={mode === 'di' ? 4 : 2}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {/* The Grid */}
                    {results && (
                        <div className="relative overflow-x-auto p-2">
                            <div className="inline-grid gap-2"
                                style={{
                                    gridTemplateColumns: `auto repeat(${results.g2.length}, minmax(60px, 1fr))`,
                                }}>

                                {/* Header Row */}
                                <div className="h-12 w-12 pt-4 pl-4 font-bold text-slate-400 italic">P1\P2</div>
                                {results.g2.map((g, i) => (
                                    <div key={i} className="flex items-center justify-center font-bold text-scientific-600 bg-scientific-50 rounded-lg h-12">
                                        {mode === 'sex' ? renderSexGenotype(g + (g.length === 1 && g !== 'Y' ? '' : '')) : g}
                                        {/* logic hack for gamete display if needed */}
                                    </div>
                                ))}

                                {/* Data Rows */}
                                {results.g1.map((rowGamete, rIdx) => (
                                    <React.Fragment key={rIdx}>
                                        <div className="flex items-center justify-center font-bold text-scientific-600 bg-scientific-50 rounded-lg w-12 md:w-16">
                                            {mode === 'sex' ? renderSexGenotype(rowGamete) : rowGamete}
                                        </div>
                                        {results.grid[rIdx].map((cell, cIdx) => (
                                            <div key={`${rIdx}-${cIdx}`} className="h-16 md:h-20 w-16 md:w-full">
                                                {renderSquare(cell)}
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Analysis Panel */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FlaskConical className="w-5 h-5" /> Genetic Analysis
                    </h3>

                    {results ? (
                        <div className="space-y-6">
                            {/* Genotypes */}
                            <div>
                                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Genotypic Ratio</h4>
                                <div className="bg-white rounded-lg border border-slate-200 divide-y">
                                    {Object.entries(results.stats.genoCounts).map(([geno, count]) => (
                                        <div key={geno} className="flex justify-between p-3 text-sm">
                                            <span className="font-mono font-semibold">{mode === 'sex' ? renderSexGenotype(geno) : geno}</span>
                                            <span className="text-slate-600">{count} / {results.stats.total} ({((count / results.stats.total) * 100).toFixed(0)}%)</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Phenotypes */}
                            <div>
                                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Phenotypic Ratio</h4>
                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={Object.entries(results.stats.phenoCounts).map(([name, value]) => ({ name, value }))}
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {Object.entries(results.stats.phenoCounts).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-slate-400 text-center py-10">
                            Invalid Genotypes
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
