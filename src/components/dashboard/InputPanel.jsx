import { useState, useEffect } from 'react';
import { Button, Input, Select, Alert } from '../ui';
import { useForm, usePrediction } from '../../hooks';
import { useStudentStore } from '../../store/useStudentStore';
import ExcelUploader from './ExcelUploader';
import {
  GENDER_OPTIONS,
  INSTITUTION_TYPE_OPTIONS,
  PROGRAM_OPTIONS,
  CLASS_PARTICIPATION_OPTIONS,
  ASSIGNMENT_SUBMISSION_OPTIONS,
  MOTIVATION_LEVEL_OPTIONS,
  STRESS_LEVEL_OPTIONS,
} from '../../constants';

// Section header component for grouping inputs
const SectionHeader = ({ title, icon }) => (
  <div className="flex items-center gap-2 mb-4 mt-8 pb-0 border-b-0">
    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">{title}</h3>
  </div>
);

const validationRules = {
  current_age: { required: true, min: 18, max: 25 },
  attendance_percentage: { required: true, min: 0, max: 100 },
  daily_study_hours: { required: true, min: 0, max: 24 },
};

export const InputPanel = () => {
  const { studentProfile, updateProfile, setPredictionResult, setBatchData } = useStudentStore();
  
  const { values, errors, handleChange, handleBlur, validate } = useForm(
    studentProfile,
    validationRules
  );
  
  const { predictWithSummary, loading } = usePrediction();
  const [error, setError] = useState(null);

  useEffect(() => {
    updateProfile(values);
  }, [values, updateProfile]);

  const handleCalculate = async () => {
    setError(null);
    if (!validate()) return;

    try {
       const cleanedData = Object.fromEntries(
        Object.entries(values)
          .filter(([_, v]) => v !== '' && v !== null)
          .map(([k, v]) => {
            const numericFields = ['current_age', 'plus_two_gpa', 'attendance_percentage',
              'daily_study_hours', 'internal_marks', 'external_marks', 'family_monthly_income_npr'];
            if (numericFields.includes(k) && v !== '') {
              return [k, parseFloat(v)];
            }
            return [k, v];
          })
      );
      
      const result = await predictWithSummary(cleanedData);
      setPredictionResult(result); 
      
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUploadComplete = (data, isBatch) => {
    if (isBatch) {
      setBatchData(data);
      // Batch mode logic handled by App.jsx; no reload needed if store updates trigger rerender
    } else {
      updateProfile(data);
      window.location.reload(); 
    }
  };

  return (
    <div className="space-y-2 pb-24">
      {/* Excel Uploader */}
      <ExcelUploader onUploadComplete={handleUploadComplete} />

      {error && (
        <Alert variant="error" className="mb-4 text-xs shadow-sm border-red-100">
          {error}
        </Alert>
      )}

      {/* Personal Bio */}
      <SectionHeader title="Personal Profile" />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Age" name="current_age" type="number" placeholder="18-25" min={18} max={25} value={values.current_age || ''} onChange={handleChange} error={errors.current_age} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
          <Select label="Gender" name="gender" options={GENDER_OPTIONS} value={values.gender} onChange={handleChange} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
        </div>
        <Select label="Program" name="program" options={PROGRAM_OPTIONS} value={values.program} onChange={handleChange} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
        <Select label="Institution" name="institution_type" options={INSTITUTION_TYPE_OPTIONS} value={values.institution_type} onChange={handleChange} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
      </div>

      {/* Academic Metrics */}
      <SectionHeader title="Academic Metrics" />
      <div className="space-y-4">
        <Input label="+2 GPA" name="plus_two_gpa" type="number" step="0.01" placeholder="0.00" value={values.plus_two_gpa || ''} onChange={handleChange} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Internal %" name="internal_marks" type="number" placeholder="0-100" value={values.internal_marks || ''} onChange={handleChange} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
          <Input label="External %" name="external_marks" type="number" placeholder="0-100" value={values.external_marks || ''} onChange={handleChange} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
        </div>
      </div>

      {/* Engagement */}
      <SectionHeader title="Engagement & Habits" />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Attendance %" name="attendance_percentage" type="number" placeholder="0-100" value={values.attendance_percentage || ''} onChange={handleChange} error={errors.attendance_percentage} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
          <Input label="Study Hrs/Day" name="daily_study_hours" type="number" step="0.5" placeholder="0-24" value={values.daily_study_hours || ''} onChange={handleChange} error={errors.daily_study_hours} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
        </div>
        <Select label="Participation" name="class_participation" options={CLASS_PARTICIPATION_OPTIONS} value={values.class_participation} onChange={handleChange} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
        <Select label="Submission" name="assignment_submission" options={ASSIGNMENT_SUBMISSION_OPTIONS} value={values.assignment_submission} onChange={handleChange} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
      </div>

      {/* Psychology */}
      <SectionHeader title="Psychological Factors" />
      <div className="space-y-4">
        <Select label="Motivation" name="motivation_level" options={MOTIVATION_LEVEL_OPTIONS} value={values.motivation_level} onChange={handleChange} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
        <Select label="Stress Level" name="stress_level" options={STRESS_LEVEL_OPTIONS} value={values.stress_level} onChange={handleChange} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
        <Input label="Income (NPR)" name="family_monthly_income_npr" type="number" placeholder="Optional" value={values.family_monthly_income_npr || ''} onChange={handleChange} className="text-sm bg-white border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-lg" />
      </div>

      {/* Calculate Button - Sticky Bottom of Sidebar */}
      <div className="fixed bottom-0 left-0 w-[380px] p-5 bg-white border-t border-gray-200 z-20">
         <Button 
           onClick={handleCalculate} 
           loading={loading}
           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-none"
         >
           Calculate Prediction
         </Button>
      </div>
    </div>
  );
};

export default InputPanel;
