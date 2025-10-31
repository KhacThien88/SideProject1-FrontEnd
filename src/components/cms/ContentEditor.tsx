import { useState, useEffect } from 'react';
import { contentManager, type ContentVersion } from '@/utils/contentManagement';

/**
 * Content Editor Component
 * Provides UI for editing content with preview and versioning
 */
export const ContentEditor = () => {
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [selectedLocale, setSelectedLocale] = useState<string>('en');
  const [content, setContent] = useState<any>('');
  const [versions, setVersions] = useState<ContentVersion[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    // Only show in development
    setShowEditor(import.meta.env.DEV);
  }, []);

  useEffect(() => {
    if (selectedKey) {
      loadContent();
    }
  }, [selectedKey, selectedLocale]);

  const loadContent = () => {
    const currentContent = contentManager.getContent(selectedKey, selectedLocale);
    setContent(typeof currentContent === 'object' ? JSON.stringify(currentContent, null, 2) : currentContent);

    const metadata = contentManager.getMetadata(selectedKey, selectedLocale);
    setVersions(metadata?.versions || []);
  };

  const handleSave = () => {
    try {
      let parsedContent = content;
      try {
        parsedContent = JSON.parse(content);
      } catch {
        // Keep as string if not valid JSON
      }

      contentManager.updateContent(
        selectedKey,
        parsedContent,
        selectedLocale,
        'editor',
        'Manual edit'
      );

      alert('✅ Content saved successfully!');
      loadContent();
    } catch (error) {
      alert(`❌ Error saving content: ${(error as Error).message}`);
    }
  };

  const handlePreview = () => {
    try {
      let parsedContent = content;
      try {
        parsedContent = JSON.parse(content);
      } catch {
        // Keep as string if not valid JSON
      }

      contentManager.setPreviewContent(selectedKey, parsedContent, selectedLocale);
      contentManager.enablePreview();
      setIsPreview(true);
      alert('👁️ Preview mode enabled. Refresh the page to see changes.');
    } catch (error) {
      alert(`❌ Error enabling preview: ${(error as Error).message}`);
    }
  };

  const handleDisablePreview = () => {
    contentManager.disablePreview();
    setIsPreview(false);
    alert('👁️ Preview mode disabled');
  };

  const handleRestoreVersion = (versionId: string) => {
    if (confirm('Are you sure you want to restore this version?')) {
      try {
        contentManager.restoreVersion(selectedKey, versionId, selectedLocale, 'editor');
        alert('✅ Version restored successfully!');
        loadContent();
      } catch (error) {
        alert(`❌ Error restoring version: ${(error as Error).message}`);
      }
    }
  };

  const handleExport = () => {
    const data = contentManager.exportContent(selectedLocale);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-${selectedLocale}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = event.target?.result as string;
            contentManager.importContent(data, 'editor');
            alert('✅ Content imported successfully!');
            loadContent();
          } catch (error) {
            alert(`❌ Error importing content: ${(error as Error).message}`);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  if (!showEditor) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Content Editor
        </h3>
        <button
          onClick={() => setShowEditor(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      {/* Controls */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-3">
        <div className="flex gap-3">
          <input
            type="text"
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
            placeholder="Content key (e.g., hero.headline)"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <select
            value={selectedLocale}
            onChange={(e) => setSelectedLocale(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="en">English</option>
            <option value="vi">Vietnamese</option>
          </select>
        </div>

        {isPreview && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700 dark:text-blue-300">
                👁️ Preview mode is active
              </span>
              <button
                onClick={handleDisablePreview}
                className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
              >
                Disable
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter content here..."
          className="w-full h-64 px-3 py-2 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />

        {/* Versions */}
        {versions.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Version History ({versions.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {versions.slice().reverse().map((version) => (
                <div
                  key={version.id}
                  className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          version.status === 'published' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                          version.status === 'approved' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                          version.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                          'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}>
                          {version.status}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          by {version.author}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {version.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(version.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRestoreVersion(version.id)}
                      className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium ml-2"
                    >
                      Restore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!selectedKey}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-lg transition-colors"
          >
            💾 Save
          </button>
          <button
            onClick={handlePreview}
            disabled={!selectedKey}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:bg-gray-300 rounded-lg transition-colors"
          >
            👁️ Preview
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            📤 Export
          </button>
          <button
            onClick={handleImport}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            📥 Import
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Toggle button for showing/hiding editor
 */
export const ContentEditorToggle = () => {
  const [isVisible, setIsVisible] = useState(false);

  if (!import.meta.env.DEV) return null;

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-4 right-4 z-40 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        title="Toggle Content Editor"
      >
        📝
      </button>
      {isVisible && <ContentEditor />}
    </>
  );
};
