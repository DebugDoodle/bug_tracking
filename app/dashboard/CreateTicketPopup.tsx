import React from 'react';

interface CreateTicketPopupProps {
  onClose: () => void;
}

const CreateTicketPopup: React.FC<CreateTicketPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Ticket</h2>
        {/* Add your form elements for creating a ticket */}
        <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateTicketPopup;
