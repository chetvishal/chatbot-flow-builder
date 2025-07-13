import React from 'react';
import { Save, AlertCircle } from 'lucide-react';

interface SaveButtonProps {
  onSave: () => void;
  isValid: boolean;
}

/**
 * SaveButton component - Handles flow validation and saving
 * Features:
 * - Visual feedback for validation state
 * - Error indication when flow is invalid
 * - Professional button styling
 */
const SaveButton: React.FC<SaveButtonProps> = ({ onSave, isValid }) => {
    return (
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {/* Validation Error Message */}
        {!isValid && (
          <div className="
            bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-md
            flex items-center gap-2 text-sm font-medium
            shadow-sm animate-in fade-in duration-200
          ">
            <AlertCircle size={16} />
            <span>Cannot save Flow</span>
          </div>
        )}
        
        {/* Save Button */}
        <button
          onClick={onSave}
          className={`
            px-4 py-2 rounded-md font-medium text-sm
            flex items-center gap-2
            transition-all duration-200
            shadow-sm hover:shadow-md
            ${isValid 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
          disabled={!isValid}
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>
    );
  };
  
  export default SaveButton;