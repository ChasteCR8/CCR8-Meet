"use client"

import { ReactNode, useEffect, useState } from 'react';

import StreamVideoProvider from '@/providers/StreamClientProvider';
import CustomAlert from '@/components/CustomAlert';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
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
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
      {/* Render the custom alert modal if needed */}
      {showAlert && (
        <CustomAlert
          message={showAlert}
          onClose={() => setShowAlert(null)}
        />
      )}
    </main>
  );
};

export default RootLayout;
