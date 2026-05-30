'use client';

import { useAppStore } from '@/store/app-store';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { DecisionEntry } from '@/types';
import { format } from 'date-fns';

export default function LabPage() {
  const { decisionEntries, addDecisionEntry, deleteDecisionEntry } = useAppStore();
  const [showNewForm, setShowNewForm] = useState(false);
  const [formData, setFormData] = useState({
    context: '',
    decision: '',
    reasoning: '',
    layer23: '',
    moralCheck: '',
  });

  const handleAddDecision = () => {
    if (!formData.decision.trim()) return;
    const newEntry: DecisionEntry = {
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      context: formData.context,
      decision: formData.decision,
      reasoning: formData.reasoning,
      layer23: formData.layer23,
      moralCheck: formData.moralCheck,
    };
    addDecisionEntry(newEntry);
    setFormData({ context: '', decision: '', reasoning: '', layer23: '', moralCheck: '' });
    setShowNewForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="page-header p-8 md:p-12 flex items-center justify-between">
        <div>
          <h1 className="page-title">Decision Lab</h1>
          <p className="page-subtitle">Structured decision journal with second/third-order analysis</p>
        </div>
        <button
          onClick={() => setShowNewForm(!showNewForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} /> New Decision
        </button>
      </div>

      <div className="container mx-auto p-6 md:p-8">
        {/* New Decision Form */}
        {showNewForm && (
          <div className="card p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-4">Record Decision</h3>
            <div className="space-y-4">
              <textarea
                placeholder="Context: What is the situation?"
                value={formData.context}
                onChange={e => setFormData({ ...formData, context: e.target.value })}
                className="input"
                rows={3}
              />
              <textarea
                placeholder="Decision: What are you deciding?"
                value={formData.decision}
                onChange={e => setFormData({ ...formData, decision: e.target.value })}
                className="input"
                rows={3}
              />
              <textarea
                placeholder="Reasoning: Why are you making this decision?"
                value={formData.reasoning}
                onChange={e => setFormData({ ...formData, reasoning: e.target.value })}
                className="input"
                rows={3}
              />
              <textarea
                placeholder="2nd & 3rd Order Effects: What are the downstream consequences?"
                value={formData.layer23}
                onChange={e => setFormData({ ...formData, layer23: e.target.value })}
                className="input"
                rows={3}
              />
              <textarea
                placeholder="Moral Checkpoint: Does this align with your values?"
                value={formData.moralCheck}
                onChange={e => setFormData({ ...formData, moralCheck: e.target.value })}
                className="input"
                rows={3}
              />
              <div className="flex gap-2">
                <button onClick={handleAddDecision} className="btn-primary">
                  Record Decision
                </button>
                <button onClick={() => setShowNewForm(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Decisions List */}
        <div className="space-y-6">
          {decisionEntries.map(entry => (
            <div key={entry.id} className="card p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-500 font-medium">{entry.date}</p>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{entry.decision}</h3>
                </div>
                <button
                  onClick={() => deleteDecisionEntry(entry.id)}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                {entry.context && (
                  <div>
                    <p className="font-semibold text-slate-700 mb-1">Context</p>
                    <p className="text-slate-600">{entry.context}</p>
                  </div>
                )}
                {entry.reasoning && (
                  <div>
                    <p className="font-semibold text-slate-700 mb-1">Reasoning</p>
                    <p className="text-slate-600">{entry.reasoning}</p>
                  </div>
                )}
                {entry.layer23 && (
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="font-semibold text-blue-900 mb-1">2nd & 3rd Order Effects</p>
                    <p className="text-blue-800 text-xs">{entry.layer23}</p>
                  </div>
                )}
                {entry.moralCheck && (
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <p className="font-semibold text-green-900 mb-1">Moral Checkpoint</p>
                    <p className="text-green-800 text-xs">{entry.moralCheck}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {decisionEntries.length === 0 && !showNewForm && (
          <div className="card p-12 text-center">
            <p className="text-slate-500 mb-4">No decisions recorded yet. Start building your decision journal.</p>
            <button
              onClick={() => setShowNewForm(true)}
              className="btn-primary"
            >
              Record Your First Decision
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
