import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Camera, Activity, Brain, Zap } from 'lucide-react';

const apps = [
    {
        id: 'iso-mood',
        title: 'Iso-Mood Player',
        description: 'Therapeutic cross-fader to gradually shift your emotional state.',
        icon: <Music size={32} className="text-blue-400" />,
        color: 'from-blue-500 to-teal-400',
        path: '/iso-mood'
    },
    {
        id: 'emotion-mirror',
        title: 'Emotion Mirror',
        description: 'Webcam-based emotion detection with responsive bio-feedback music.',
        icon: <Camera size={32} className="text-purple-400" />,
        color: 'from-purple-500 to-pink-400',
        path: '/emotion-mirror'
    },
    {
        id: 'rhythm-farm',
        title: 'Rhythm Farm',
        description: 'Impulse control training for ADHD/Autism (Locked).',
        icon: <Activity size={32} className="text-green-400" />,
        color: 'from-green-500 to-emerald-400',
        path: '/rhythm-farm',
        locked: false
    },
    {
        id: 'zen-garden',
        title: 'Zen Garden',
        description: 'Mindfulness audio-visual gardening experience (Locked).',
        icon: <Brain size={32} className="text-slate-600" />,
        color: 'from-slate-700 to-slate-600',
        path: '#',
        locked: true
    }
];

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans p-8">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 mb-2">
                    Music Therapy Platform
                </h1>
                <p className="text-slate-400">Select a therapeutic application to begin.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {apps.map((app) => (
                    <Link
                        to={app.path}
                        key={app.id}
                        className={`block relative group overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 transition-all hover:bg-white/10 hover:scale-[1.02] ${app.locked ? 'opacity-50 pointer-events-none grayscale' : ''}`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="mb-4 p-3 bg-black/30 rounded-full w-fit backdrop-blur-sm">
                                {app.icon}
                            </div>
                            <h2 className="text-xl font-bold mb-2 text-white">{app.title}</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">{app.description}</p>

                            {!app.locked && (
                                <div className="mt-auto pt-4 flex items-center text-xs font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                                    Launch App <Zap size={12} className="ml-2" />
                                </div>
                            )}
                            {app.locked && (
                                <div className="mt-auto pt-4 flex items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Coming Soon
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
