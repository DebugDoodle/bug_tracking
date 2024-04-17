import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody,Chip,TableRow, TableCell, getKeyValue,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import {EditDocumentIcon} from "../icons/EditDocumentIcon";
import {DeleteDocumentIcon} from "../icons/DeleteDocumentIcon";
import {VerticalDotsIcon} from "../icons/VerticalDotsIcon"


interface Ticket {
  Key: string;
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

const rows = [{ Key: "" }];
const columns = [
  {
    key: "ID",
    label: "Ticket ID",
  },
  {
    key: "Module",
    label: "Module",
  },
  {
    key: "TicketTitle",
    label: "Ticket Title",
  },
  {
    key: "Status",
    label: "Status",
  },
  {
    key: "Priority",
    label: "Priority",
  },
  {
    key: "Assignee",
    label: "Assignee",
  },
  {
    key: "options",
    label: "Actions",
  }
];

export default function App() {
  const [initrows, setRows] = useState(rows);
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0 text-black";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5294/api/bugdata', {
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
        const rowsId = data.OpenTicketsList.map(item => ({ ...item, Key: item.ID }));
        setRows(rowsId);
        console.log(rowsId);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOptionSelect = (option: string, ticketId: string) => {
    switch (option) {
      case "close":
        handleCloseTicket(ticketId);
        break;
      case "delete":
        handleDeleteTicket(ticketId);
        break;
      case "notify":
        handleSendNotification(ticketId);
        break;
      default:
        break;
    }
  };

  const handleCloseTicket = (ticketId: string) => {
    console.log("Closing ticket with ID:", ticketId);
  };

  const handleDeleteTicket = (ticketId: string) => {
    console.log("Deleting ticket with ID:", ticketId);
  };

  const handleSendNotification = (ticketId: string) => {
    console.log("Sending notification for ticket with ID:", ticketId);
  };

  return (
    <Table aria-label="Open Tickets">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody>
        {initrows.map((row) =>
          <TableRow key={row.Key}>
            {(columnKey) => {
              if (columnKey === "options") {
                return (
                  <TableCell className=" items-center">
                    <Dropdown backdrop="blur">
      <DropdownTrigger>
      <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
      </DropdownTrigger>
      <DropdownMenu variant="shadow" aria-label="Dropdown menu with icons">
        <DropdownItem
          key="new"
          startContent={<EditDocumentIcon className={iconClasses} />}
        >
          <div className=" text-black">Resolve Bug</div>
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
        >
          <div className=" text-red-600">
          Delete Bug
          </div>
        </DropdownItem>     
      </DropdownMenu>          
    </Dropdown>
                  </TableCell>
                );
              } 
              if (columnKey === "Status") {
                return (
                  <TableCell >
                    <Chip
      variant="shadow"
      classNames={{
        base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
        content: "drop-shadow shadow-black text-white",
      }}
    >
      {getKeyValue(row, columnKey)}
    </Chip>
                  </TableCell>
                );
              }
              else {
                return <TableCell>{getKeyValue(row, columnKey)}</TableCell>;
              }
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
