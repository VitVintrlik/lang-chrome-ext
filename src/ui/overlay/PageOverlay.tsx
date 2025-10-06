import { FC, ReactNode } from 'react';

interface SubtitleOverlayProps {
  onClose: () => void;
  children?: ReactNode;
}

function PageOverlay({ onClose, children }: SubtitleOverlayProps) {
  return (
    <div className="overlay">
      <div className="overlay__backdrop">
        <button onClick={onClose}>Close overlay</button>
      </div>
      <div className="overlay__content">{children}</div>
    </div>
  );
}

export default PageOverlay;
