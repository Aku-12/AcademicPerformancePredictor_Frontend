import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useStudentStore = create(
  persist(
    (set) => ({
      // State
      studentProfile: {
        current_age: '',
        gender: '',
        institution_type: '',
        program: '',
        plus_two_gpa: '',
        attendance_percentage: '',
        daily_study_hours: '',
        internal_marks: '',
        external_marks: '',
        attendance_category: '',
        stress_level: '',
        motivation_level: '',
        class_participation: '',
        assignment_submission: '',
        family_monthly_income_npr: '',
      },
      predictionResult: null,
      
      // Batch State
      isBatchMode: false,
      batchData: [], // Array of student profiles
      batchResults: null, // Array of predictions or aggregated stats

      uiState: {
        lastUpdated: null,
        isSidebarOpen: true,
      },

      // Actions
      updateProfile: (updates) =>
        set((state) => ({
          studentProfile: { ...state.studentProfile, ...updates },
          isBatchMode: false, // Switch back to single mode on manual edit
        })),

      setBatchData: (data) => 
        set({
          batchData: data,
          isBatchMode: true,
          batchResults: null // Reset results until processed
        }),

      setPredictionResult: (result) =>
        set({
          predictionResult: result,
          uiState: { lastUpdated: new Date().toISOString() },
        }),
        
      setBatchResults: (results) =>
        set({
          batchResults: results,
          uiState: { lastUpdated: new Date().toISOString() },
        }),

      resetProfile: () =>
        set({
          studentProfile: { /* defaults */ },
          predictionResult: null,
          isBatchMode: false,
          batchData: [],
          batchResults: null
        }),
      
      toggleSidebar: () => 
        set((state) => ({
          uiState: { ...state.uiState, isSidebarOpen: !state.uiState.isSidebarOpen }
        })),
    }),
    {
      name: 'student-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
