import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGoal = create(
  persist(
    (set) => ({
      goals: [],
      setGoals: (payload) => set((state) => ({ 
        goals: [...state.goals, payload] 
      })),
      removeGoal: (id) => set((state) => ({ 
        goals: state.goals.filter(goal => goal.id !== id) 
      })),
      updateGoal: (id, updates) => set((state) => ({
        goals: state.goals.map(goal => goal.id === id ? { ...goal, ...updates } : goal)
      })),
    }),
    {
      name: "goal",
    }
  )
);