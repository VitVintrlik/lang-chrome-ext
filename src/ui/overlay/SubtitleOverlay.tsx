interface SubtitleOverlayProps {
  isVisible: boolean;
  subtitleText: string;
  onClose: () => void;
}

const SubtitleOverlay: React.FC<SubtitleOverlayProps> = ({ isVisible, subtitleText, onClose }) => {
  if (!isVisible) return null;

  console.log('Rendering SubtitleOverlay with text:', subtitleText);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Subtitle Text</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="text-lg text-gray-700 leading-relaxed mb-4">
          {subtitleText || 'No subtitle text found'}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Translate
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubtitleOverlay;
