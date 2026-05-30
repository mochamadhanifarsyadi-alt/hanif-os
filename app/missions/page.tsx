'use client';

import { useAppStore } from '@/store/app-store';
import { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Mission, MissionTask } from '@/types';

export default function MissionsPage() {
  const { missions, addMission, updateMission, deleteMission } = useAppStore();
  const [showNewForm, setShowNewForm] = useState(false);
  const [newMissionTitle, setNewMissionTitle] = useState('');
  const [expandedMissionId, setExpandedMissionId] = useState<string | null>(null);

  const handleAddMission = () => {
    if (!newMissionTitle.trim()) return;
    const newMission: Mission = {
      id: uuidv4(),
      title: newMissionTitle,
      phase: 'Sekarang',
      timeframe: '0-12 bulan',
      objective: '',
      tasks: [],
    };
    addMission(newMission);
    setNewMissionTitle('');
    setShowNewForm(false);
  };

  const handleAddTask = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;
    const newTask: MissionTask = {
      id: uuidv4(),
      text: '',
      done: false,
    };
    updateMission(missionId, { tasks: [...mission.tasks, newTask] });
  };

  const handleToggleTask = (missionId: string, taskId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;
    const updatedTasks = mission.tasks.map(t =>
      t.id === taskId ? { ...t, done: !t.done } : t
    );
    updateMission(missionId, { tasks: updatedTasks });
  };

  const handleDeleteTask = (missionId: string, taskId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;
    const updatedTasks = mission.tasks.filter(t => t.id !== taskId);
    updateMission(missionId, { tasks: updatedTasks });
  };

  const handleUpdateTaskText = (missionId: string, taskId: string, text: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;
    const updatedTasks = mission.tasks.map(t =>
      t.id === taskId ? { ...t, text } : t
    );
    updateMission(missionId, { tasks: updatedTasks });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="page-header p-8 md:p-12 flex items-center justify-between">
        <div>
          <h1 className="page-title">Missions</h1>
          <p className="page-subtitle">Strategic roadmap and action architecture</p>
        </div>
        <button
          onClick={() => setShowNewForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} /> New Mission
        </button>
      </div>

      <div className="container mx-auto p-6 md:p-8">
        {/* New Mission Form */}
        {showNewForm && (
          <div className="card p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-4">Create New Mission</h3>
            <input
              type="text"
              placeholder="Mission title"
              value={newMissionTitle}
              onChange={e => setNewMissionTitle(e.target.value)}
              className="input mb-4"
            />
            <div className="flex gap-2">
              <button onClick={handleAddMission} className="btn-primary">
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewForm(false);
                  setNewMissionTitle('');
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Missions List */}
        <div className="space-y-6">
          {missions.map(mission => {
            const completedTasks = mission.tasks.filter(t => t.done).length;
            const progress = mission.tasks.length > 0
              ? Math.round((completedTasks / mission.tasks.length) * 100)
              : 0;

            return (
              <div key={mission.id} className="card overflow-hidden">
                <div
                  onClick={() => setExpandedMissionId(
                    expandedMissionId === mission.id ? null : mission.id
                  )}
                  className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-lg mb-2">
                        {mission.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          {mission.phase}
                        </span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                          {mission.timeframe}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500">
                        {completedTasks} of {mission.tasks.length} tasks completed
                      </p>
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        deleteMission(mission.id);
                      }}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Expanded Tasks */}
                {expandedMissionId === mission.id && (
                  <div className="border-t border-slate-200 p-6 bg-slate-50">
                    <div className="space-y-3 mb-4">
                      {mission.tasks.map(task => (
                        <div key={task.id} className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleTask(mission.id, task.id)}
                            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                              task.done
                                ? 'bg-green-500 border-green-500'
                                : 'border-slate-300 hover:border-blue-600'
                            }`}
                          >
                            {task.done && <Check size={16} className="text-white" />}
                          </button>
                          <input
                            type="text"
                            value={task.text}
                            onChange={e => handleUpdateTaskText(mission.id, task.id, e.target.value)}
                            className="flex-1 bg-white border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Task description"
                          />
                          <button
                            onClick={() => handleDeleteTask(mission.id, task.id)}
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => handleAddTask(mission.id)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                    >
                      <Plus size={16} /> Add Task
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {missions.length === 0 && !showNewForm && (
          <div className="card p-12 text-center">
            <p className="text-slate-500 mb-4">No missions yet.</p>
            <button
              onClick={() => setShowNewForm(true)}
              className="btn-primary"
            >
              Create Your First Mission
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
