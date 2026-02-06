import { useState, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import { Button, Alert } from '../ui';

export const MarksheetUploader = ({ onScanComplete }) => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScanning(true);
    setProgress(0);
    setError(null);

    try {
      const worker = await createWorker('eng', 1, {
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(Math.floor(m.progress * 100));
          }
        }
      });
      
      const ret = await worker.recognize(file, {
        rotateAuto: true,
      });
      
      const text = ret.data.text;
      await worker.terminate();
      
      processText(text);
      
    } catch (err) {
      console.error(err);
      setError('Failed to scan document. Please try a clearer image.');
    } finally {
      setScanning(false);
    }
  };

  const processText = (text) => {
    // Simple regex heuristics to find key values
    const extractedData = {};
    
    // Look for GPA (e.g. "GPA 3.65", "GPA: 3.65")
    const gpaMatch = text.match(/GPA[:\s]*(\d\.\d{1,2})/i);
    if (gpaMatch) extractedData['plus_two_gpa'] = parseFloat(gpaMatch[1]);

    // Look for Internal Marks (e.g. "Internal: 80", "Internal Marks 80")
    const internalMatch = text.match(/Internal\s*(?:Marks)?[:\s]*(\d{1,3}(?:\.\d)?)/i);
    if (internalMatch) extractedData['internal_marks'] = parseFloat(internalMatch[1]);

    // Look for External Marks
    const externalMatch = text.match(/External\s*(?:Marks)?[:\s]*(\d{1,3}(?:\.\d)?)/i);
    if (externalMatch) extractedData['external_marks'] = parseFloat(externalMatch[1]);

    // Pass data back
    if (Object.keys(extractedData).length > 0) {
      onScanComplete(extractedData);
    } else {
      setError('Could not identify specific academic fields. Please enter manually.');
    }
  };

  return (
    <div className="mb-6 p-4 border border-dashed border-indigo-200 rounded-xl bg-indigo-50/30 text-center">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      {scanning ? (
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-indigo-600 font-medium text-sm">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Scanning... {progress}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <div className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      ) : (
        <div>
           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mx-auto mb-2 text-indigo-500 shadow-sm">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
           </div>
           <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1">Auto-Fill from Marksheet</h4>
           <div className="flex gap-2 justify-center mt-3">
             <Button onClick={() => fileInputRef.current?.click()} size="sm" className="bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-100 shadow-sm text-xs py-1.5 h-auto">
               Upload Image
             </Button>
             {/* Link to sample for testing */}
             <a href="/sample_marksheet.png" download className="text-[10px] text-gray-400 hover:text-indigo-500 underline self-center">Download Sample</a>
           </div>
        </div>
      )}
      
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default MarksheetUploader;
