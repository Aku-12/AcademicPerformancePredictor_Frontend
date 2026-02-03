import { useState, useRef } from 'react';
import readXlsxFile from 'read-excel-file';
import { Button } from '../ui';

// Field Mapping (Excel Header -> Store Key)
const FIELD_MAP = {
  'Age': 'current_age',
  'Gender': 'gender',
  'Program': 'program',
  'Institution Type': 'institution_type',
  'Plus Two GPA': 'plus_two_gpa',
  'Internal Marks': 'internal_marks',
  'External Marks': 'external_marks',
  'Attendance %': 'attendance_percentage',
  'Study Hours/Day': 'daily_study_hours',
  'Class Participation': 'class_participation',
  'Assignment Submission': 'assignment_submission',
  'Motivation Level': 'motivation_level',
  'Stress Level': 'stress_level',
  'Family Income': 'family_monthly_income_npr'
};

export const ExcelUploader = ({ onUploadComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const rows = await readXlsxFile(file);
      
      if (rows.length < 2) {
        throw new Error('File appears empty or missing headers.');
      }

      const headers = rows[0];
      const dataRows = rows.slice(1);

      // Parse all rows
      const allStudents = dataRows.map(row => {
        const student = {};
        headers.forEach((header, index) => {
          const key = FIELD_MAP[header];
          if (key) {
            student[key] = row[index];
          }
        });
        return student;
      }).filter(s => Object.keys(s).length > 0);

      if (allStudents.length === 0) {
        throw new Error('No valid rows found.');
      }

      // Check if it's a single student or batch
      if (allStudents.length === 1) {
        onUploadComplete(allStudents[0], false); // isBatch = false
      } else {
        onUploadComplete(allStudents, true); // isBatch = true
      }
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to parse Excel file.');
    } finally {
      setLoading(false);
      if(fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-6 p-5 border border-dashed border-indigo-200 rounded-xl bg-indigo-50/10 text-center">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".xlsx, .xls" 
        className="hidden" 
      />
      
      <div className="space-y-3">
         <div className="w-12 h-12 bg-white rounded-xl border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600 shadow-sm">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
         </div>
         
         <div>
           <h4 className="text-sm font-semibold text-gray-900">Upload Data</h4>
           <p className="text-xs text-gray-500 mt-1">Single or Batch (.xlsx)</p>
         </div>

         <div className="flex gap-3 justify-center pt-2">
           <Button onClick={() => fileInputRef.current?.click()} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-medium px-4">
             {loading ? 'Parsing...' : 'Select File'}
           </Button>
           <a 
             href="/student_data_template.xlsx" 
             download 
             className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-colors flex items-center gap-2"
           >
             Template
           </a>
         </div>
         
         {/* Download Sample Dataset Link */}
         <a href="/class_data_50.xlsx" download className="text-[10px] text-indigo-400 hover:text-indigo-600 underline block mt-2">
           Download Sample Class (50 Students)
         </a>
      </div>
      
      {error && <p className="text-xs text-red-600 bg-red-50 p-2 rounded mt-3 border border-red-100">{error}</p>}
    </div>
  );
};

export default ExcelUploader;
