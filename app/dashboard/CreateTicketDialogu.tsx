import React, { useState, useEffect } from 'react';

interface Assignee {
  id: string;
  name: string;
}

interface CreateTicketDialogueProps {
  onClose: () => void;
}

const CreateTicketDialogue: React.FC<CreateTicketDialogueProps> = ({ onClose }) => {
  const [module, setModule] = useState<string>('');
  const [ticketTitle, setTicketTitle] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<string>('');

  useEffect(() => {
    fetchAssignees();
  }, []);

  const fetchAssignees = async () => {
    try {
      const response = await fetch('http://localhost:5294/api/FetchEmployeeHierarchy');
      if (!response.ok) {
        throw new Error('Failed to fetch assignees');
      }
      const data: Assignee[] = await response.json();
      setAssignees(data);
    } catch (error) {
      console.error('Error fetching assignees:', error);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const dataToSend = {
        module: module,
        ticketTitle: ticketTitle,
        assignee: selectedAssignee,
        priority: priority
      };
      console.log(dataToSend);
  
      const response = await fetch('http://localhost:5294/api/CreateTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }
  
      console.log('Ticket created successfully!');
      onClose(); // Close the dialogue after successful submission
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };
  

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPriority(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Ticket</h2>
        <div className="mb-4">
          <input type="text" value={module} onChange={(e) => setModule(e.target.value)} placeholder="Module" className="border border-gray-300 p-2 rounded-md w-full mb-2" />
          <input type="text" value={ticketTitle} onChange={(e) => setTicketTitle(e.target.value)} placeholder="Ticket Title" className="border border-gray-300 p-2 rounded-md w-full mb-2" />
          <div className="relative mb-2">
            <input type="text" value={selectedAssignee} onChange={(e) => setSelectedAssignee(e.target.value)} placeholder="Assign To" className="border border-gray-300 p-2 rounded-md w-full" readOnly />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <select onChange={(e) => setSelectedAssignee(e.target.value)} className="border-none appearance-none bg-transparent">
                <option value="">Select Assignee</option>
                {assignees.map((assignee) => (
                  <option key={assignee.id} value={assignee.id}>{assignee.name}</option>
                ))}
              </select>
            </div>
          </div>
          <label className="block mb-2">Priority:</label>
          <select value={priority} onChange={handlePriorityChange} className="border border-gray-300 p-2 rounded-md w-full mb-2">
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Create
        </button>
        <button onClick={onClose} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateTicketDialogue;
