import React, { useState, useEffect } from 'react';

interface CustomAlertProps {
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling while alert is open
    } else {
      document.body.style.overflow = ''; // Restore scrolling when alert is closed
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Delay to match the animation duration
  };

  const [showAlert, setShowAlert] = useState<string | null>(null);

	useEffect(() => {
	  const handleContextMenu = (e: MouseEvent) => {
		e.preventDefault();
		setShowAlert("Right-click is disabled on this site. Please use the site's navigation to explore.");
	  };
  
	  const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "F12" || (e.ctrlKey && (e.key === "I" || e.key === "U"))) {
		  e.preventDefault();
		  setShowAlert("Keyboard shortcuts for developer tools are disabled on this site.");
		}
	  };
  
	  document.addEventListener('contextmenu', handleContextMenu);
	  document.addEventListener('keydown', handleKeyDown);
  
	  return () => {
		document.removeEventListener('contextmenu', handleContextMenu);
		document.removeEventListener('keydown', handleKeyDown);
	  };
	}, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-sm w-full transition-transform duration-300 transform ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
      >
        <p className="text-lg mb-4">{message}</p>
        <button
          onClick={handleClose}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
        >
          Close
        </button>
      </div>
      {/* Render the custom alert modal if needed */}
      {showAlert && (
        <CustomAlert
          message={showAlert}
          onClose={() => setShowAlert(null)}
        />
      )}
    </div>
  );
};

export default CustomAlert;
