'use client';

import { useAppStore } from '@/store/app-store';
import { useState } from 'react';
import { Zap, RefreshCw } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { StrategistMemory } from '@/types';

export default function ArchitectPage() {
  const {
    userProfile,
    missions,
    libraryItems,
    portfolioItems,
    weeklyOps,
    getMissionProgress,
    getLibraryProgress,
    getPortfolioProgress,
    getWeeklyProgress,
    strategistMemory,
    setStrategistMemory,
  } = useAppStore();

  const [energyLevel, setEnergyLevel] = useState(5);
  const [availableHours, setAvailableHours] = useState(10);
  const [dominantPriority, setDominantPriority] = useState('');
  const [contextSnapshot, setContextSnapshot] = useState('');

  const generateStrategistAnalysis = () => {
    const missionProgress = getMissionProgress();
    const libraryProgress = getLibraryProgress();
    const portfolioProgress = getPortfolioProgress();
    const weeklyProgress = getWeeklyProgress();

    const priorities = [];
    const defer = [];

    if (missionProgress < 50) {
      priorities.push('Accelerate mission task completion');
    }
    if (portfolioProgress < 30) {
      priorities.push('Increase written output frequency');
    }
    if (libraryProgress < 40) {
      priorities.push('Deepen learning foundation');
    }

    if (dominantPriority) {
      priorities.unshift(dominantPriority);
    }

    const blindSpots = [];
    if (portfolioProgress === 0) {
      blindSpots.push('No portfolio outputs yet - this is critical');
    }
    if (energyLevel < 3) {
      blindSpots.push('Energy level is low - may need recovery time');
    }

    const analysis: StrategistMemory = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      priorities: priorities.slice(0, 3),
      defer: defer,
      blindSpot: blindSpots.length > 0 ? blindSpots[0] : 'Maintain consistency in execution',
      correction: availableHours < 10 ? 'Focus on high-impact tasks only' : 'Build depth in chosen areas',
      question: 'Are my daily actions aligned with my long-term strategic path?',
    };

    setStrategistMemory(analysis);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="page-header p-8 md:p-12">
        <h1 className="page-title">AI Strategist (Architect)</h1>
        <p className="page-subtitle">Strategic prioritization and blind spot detection</p>
      </div>

      <div className="container mx-auto p-6 md:p-8">
        {/* Input Panel */}
        <div className="card p-8 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Strategic Context</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Energy Level (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={energyLevel}
                onChange={e => setEnergyLevel(parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 mt-1">{energyLevel}/10</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Available Hours This Week
              </label>
              <input
                type="number"
                value={availableHours}
                onChange={e => setAvailableHours(parseInt(e.target.value))}
                className="input"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Dominant Priority
            </label>
            <input
              type="text"
              placeholder="What is your top priority this period?"
              value={dominantPriority}
              onChange={e => setDominantPriority(e.target.value)}
              className="input"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Context Snapshot
            </label>
            <textarea
              placeholder="Any other context I should know about?"
              value={contextSnapshot}
              onChange={e => setContextSnapshot(e.target.value)}
              className="input"
              rows={4}
            />
          </div>
          <button
            onClick={generateStrategistAnalysis}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Zap size={20} /> Generate Strategic Analysis
          </button>
        </div>

        {/* Current Status */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Current Strategic Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card p-4">
              <p className="text-xs font-medium text-slate-600">Mission Progress</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{getMissionProgress()}%</p>
            </div>
            <div className="card p-4">
              <p className="text-xs font-medium text-slate-600">Learning Progress</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{getLibraryProgress()}%</p>
            </div>
            <div className="card p-4">
              <p className="text-xs font-medium text-slate-600">Portfolio Progress</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{getPortfolioProgress()}%</p>
            </div>
            <div className="card p-4">
              <p className="text-xs font-medium text-slate-600">Weekly Progress</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{getWeeklyProgress()}%</p>
            </div>
          </div>
        </section>

        {/* Strategist Analysis Output */}
        {strategistMemory && (
          <section className="card p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Zap size={24} className="text-blue-600" />
              Strategic Analysis
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Priorities</h3>
                <ul className="space-y-2">
                  {strategistMemory.priorities.map((priority, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700">{priority}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {strategistMemory.defer.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Defer</h3>
                  <ul className="space-y-1">
                    {strategistMemory.defer.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-600">• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-red-50 border border-red-200 rounded p-4">
                <h3 className="font-semibold text-red-900 mb-2">Blind Spot</h3>
                <p className="text-red-800 text-sm">{strategistMemory.blindSpot}</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded p-4">
                <h3 className="font-semibold text-amber-900 mb-2">Correction</h3>
                <p className="text-amber-800 text-sm">{strategistMemory.correction}</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded p-4">
                <h3 className="font-semibold text-green-900 mb-2">Strategic Question</h3>
                <p className="text-green-800 text-sm">{strategistMemory.question}</p>
              </div>
            </div>

            <button
              onClick={generateStrategistAnalysis}
              className="mt-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              <RefreshCw size={16} /> Regenerate Analysis
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
