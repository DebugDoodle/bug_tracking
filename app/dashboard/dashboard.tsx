'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';
import TeamExplorer from './TeamExplorer';
import CreateTicketIcon from '../icons/CreateTicket';
import FilterIcon from '../icons/Filter';
import ExportIcon from '../icons/Export';
import BugsTable from './BugsTable'
import NewBugsTable from './NewBugsTable';
import { Chip, ChipProps} from "@nextui-org/react";
import CreateTicketDialogue from './CreateTicketDialogu';

interface Ticket {
  ID: string;
  Module: string;
  TicketTitle: string;
  Status: string;
  Priority: string;
  Assignee: string;
  Attachment: string;
}

interface TicketSummary {
  TotalTickets: string;
  ClosedTickets: string;
  OpenTickets: string;
  TicketsFixed: string;
  OpenTicketsList: Ticket[];
}

const Dashboard = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [ticketSummary, setTicketSummary] = useState<TicketSummary | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isDialogueOpen, setIsDialogueOpen] = useState<boolean>(false);

  const openDialogue = (): void => {
    setIsDialogueOpen(true);
  };

  const closeDialogue = (): void => {
    setIsDialogueOpen(false);
  };
  const openPopup = (): void => {
    setIsPopupOpen(true);
  };

  const closePopup = (): void => {
    setIsPopupOpen(false);
  };
  useEffect(() => {
    fetchTicketSummary();
  }, []);

  const fetchTicketSummary = async () => {
    try {
      const response = await fetch('http://localhost:5294/api/getdashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ EmployeeId: '3' })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data: TicketSummary = await response.json();
      setTicketSummary(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="text-black flex flex-col flex-1 bg-gray-200 rounded-lg">
        <div className="p-4 items-center">
          <span className="text-4xl">Hi Admin</span>
          <div>
            <span className='text-black'>Welcome to Dashboard</span>
          </div>
        </div>
        <div className="p-4 flex justify-around">
          {ticketSummary && (
            <>
              <div className="w-1/5 bg-white rounded-2xl p-4 shadow-lg">
                <Image src="/TotalTickets.png" width={50} height={50} alt="Picture of the author" />
                <div className="text-lg font-semibold">Total Tickets</div>
                <div>{ticketSummary.TotalTickets}</div>
              </div>
              <div className="w-1/5 bg-white rounded-2xl p-4 shadow-lg">
                <Image src="/TicketClose.png" width={50} height={50} alt="Picture of the author" />
                <div className="text-lg font-semibold">Closed Tickets</div>
                <div>{ticketSummary.ClosedTickets}</div>
              </div>
              <div className="w-1/5 bg-white rounded-2xl p-4 shadow-lg">
                <Image src="/TicketOpen.png" width={50} height={50} alt="Picture of the author" />
                <div className="text-lg font-semibold">Open Tickets</div>
                <div>{ticketSummary.OpenTickets}</div>
              </div>
              <div className="w-1/5 bg-white rounded-2xl p-4 shadow-lg">
                  <div className="text-lg font-semibold">Tickets Fixed</div>
                  <div className="mt-5">
                  <div className="text-green-500 font-bold">{ticketSummary.TicketsFixed}%</div>
                  <div className="bg-green-200 h-2 rounded-lg mt-1">
                  <div
        className="bg-green-500 h-full rounded-lg"
        style={{ width: `${ticketSummary.TicketsFixed}%` }}
      ></div>
                      </div>
            </div>
          </div>
            </>
          )}
        </div>

        <div className="flex flex-col bg-white p-4 rounded-2xl shadow-lg mt-4 mx-4">
          <div className="flex justify-between items-center mb-4">
            <div className="px-2 rounded-lg bg-yellow-200 border">Open Tickets :&nbsp;{ticketSummary?.OpenTickets}</div>
            <div className="flex space-x-4">
              <button onClick={openDialogue} className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-3" type="button">
                <CreateTicketIcon/>
                Create Ticket
              </button>
              {isDialogueOpen && <CreateTicketDialogue onClose={closeDialogue} />}
              <button disabled={true} className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none border border-black text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-100 to-gray-200 text-black shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-3" type="button">
                <FilterIcon/>
                Filter
              </button>
              <button disabled={true} className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none border border-black text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-100 to-gray-200 text-black shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-3" type="button">
                <ExportIcon/>
                Export
              </button>
             </div>
          </div>
          <div>
        <BugsTable/>
        </div>
        </div>
      </div>
      
      <div>
        <TeamExplorer/>
      </div>
    </div>
    
  );
};

export default Dashboard;
