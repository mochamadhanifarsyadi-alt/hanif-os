'use client';

import { useAppStore } from '@/store/app-store';
import { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { LibraryItem } from '@/types';

export default function LibraryPage() {
  const { libraryItems, addLibraryItem, updateLibraryItem, deleteLibraryItem } = useAppStore();
  const [showNewForm, setShowNewForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    level: 'Basic',
    description: '',
  });

  const handleAddLibraryItem = () => {
    if (!formData.title.trim() || !formData.category.trim()) return;
    const newItem: LibraryItem = {
      id: uuidv4(),
      category: formData.category,
      title: formData.title,
      level: formData.level,
      description: formData.description,
      completed: false,
      tags: [],
    };
    addLibraryItem(newItem);
    setFormData({ category: '', title: '', level: 'Basic', description: '' });
    setShowNewForm(false);
  };

  const categories = [...new Set(libraryItems.map(i => i.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="page-header p-8 md:p-12 flex items-center justify-between">
        <div>
          <h1 className="page-title">Strategic Library</h1>
          <p className="page-subtitle">Knowledge map and learning progress</p>
        </div>
        <button
          onClick={() => setShowNewForm(!showNewForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} /> Add Item
        </button>
      </div>

      <div className="container mx-auto p-6 md:p-8">
        {/* New Item Form */}
        {showNewForm && (
          <div className="card p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-4">Add Learning Item</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="input"
              />
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="input"
              />
              <select
                value={formData.level}
                onChange={e => setFormData({ ...formData, level: e.target.value })}
                className="input"
              >
                <option>Basic</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="input"
                rows={3}
              />
              <div className="flex gap-2">
                <button onClick={handleAddLibraryItem} className="btn-primary">
                  Add Item
                </button>
                <button onClick={() => setShowNewForm(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Items by Category */}
        <div className="space-y-8">
          {categories.length > 0 ? (
            categories.map(category => {
              const categoryItems = libraryItems.filter(i => i.category === category);
              const completed = categoryItems.filter(i => i.completed).length;
              const progress = Math.round((completed / categoryItems.length) * 100);

              return (
                <div key={category}>
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-slate-900 mb-2">{category}</h2>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 max-w-md">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-full rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">{completed}/{categoryItems.length}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryItems.map(item => (
                      <div key={item.id} className="card p-6">
                        <div className="flex items-start justify-between mb-3">
                          <button
                            onClick={() => updateLibraryItem(item.id, { completed: !item.completed })}
                            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                              item.completed
                                ? 'bg-green-500 border-green-500'
                                : 'border-slate-300 hover:border-purple-600'
                            }`}
                          >
                            {item.completed && <Check size={16} className="text-white" />}
                          </button>
                          <button
                            onClick={() => deleteLibraryItem(item.id)}
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                            {item.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="card p-12 text-center">
              <p className="text-slate-500 mb-4">Your library is empty. Start adding learning items.</p>
              <button
                onClick={() => setShowNewForm(true)}
                className="btn-primary"
              >
                Add First Item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
