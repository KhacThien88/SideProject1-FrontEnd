import React from 'react';
import { Download, Upload, RefreshCw, Trash2 } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface DataManagementTabProps {
  onExport: () => void;
  onImport: () => void;
  onReset: () => void;
  onDeleteAll: () => void;
}

export const DataManagementTab: React.FC<DataManagementTabProps> = ({
  onExport,
  onImport,
  onReset,
  onDeleteAll,
}) => {
  const { getContent } = useTranslation();
  
  return (
    <div className="space-y-6">
      {/* Export and Import */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Data */}
        <button
          onClick={onExport}
          className="flex flex-col items-center p-6 border-2 border-neutral-200 rounded-2xl hover:bg-neutral-50 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3 transition-colors">
            <Download className="w-6 h-6 text-primary-600" />
          </div>
          <div className="font-semibold text-neutral-900 mb-1">{getContent('settings.data.export')}</div>
          <div className="text-sm text-neutral-600 text-center">
            {getContent('settings.data.exportDesc')}
          </div>
        </button>

        {/* Import Data */}
        <button
          onClick={onImport}
          className="flex flex-col items-center p-6 border-2 border-neutral-200 rounded-2xl hover:bg-neutral-50 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-3 transition-colors">
            <Upload className="w-6 h-6 text-secondary-600" />
          </div>
          <div className="font-semibold text-neutral-900 mb-1">{getContent('settings.data.import')}</div>
          <div className="text-sm text-neutral-600 text-center">
            {getContent('settings.data.importDesc')}
          </div>
        </button>
      </div>

      {/* Danger Zone */}
      <div className="pt-6 border-t border-neutral-200">
        <div className="font-semibold text-neutral-900 mb-4">{getContent('settings.data.dangerZone')}</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reset Settings */}
          <button
            onClick={onReset}
            className="flex flex-col items-center p-6 border-2 border-neutral-200 rounded-2xl hover:bg-neutral-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 transition-colors">
              <RefreshCw className="w-6 h-6 text-blue-600" />
            </div>
            <div className="font-semibold text-neutral-900 mb-1">{getContent('settings.data.reset')}</div>
            <div className="text-sm text-neutral-600 text-center">
              {getContent('settings.data.resetDesc')}
            </div>
          </button>

          {/* Delete All Data */}
          <button
            onClick={onDeleteAll}
            className="flex flex-col items-center p-6 border-2 border-red-200 rounded-2xl hover:bg-neutral-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3 transition-colors">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div className="font-semibold text-red-700 mb-1">{getContent('settings.data.delete')}</div>
            <div className="text-sm text-red-600 text-center">
              {getContent('settings.data.deleteDesc')}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
