import React from "react";
import {Accordion, AccordionItem, Avatar} from "@nextui-org/react";

export default function App() {
  const defaultContent =
    "Team member details unavilable. Contact adminstrator";

  return (
    <div className=" text-xs px-5">
        <Accordion selectionMode="multiple">
      <AccordionItem
        key="1"
        aria-label="Ecommerce Website"
        startContent={
          <Avatar
            color="default"
            radius="lg"
            src="/store.png"
          />
        }
        subtitle="6 Team members"
        title="Ecommerce Website"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Medical Application"
        startContent={
          <Avatar
            color="success"
            radius="lg"
            src="/healthcare.png"
          />
        }
        subtitle="3 incompleted steps"
        title="Medical Application"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Finance Application"
        startContent={
          <Avatar
            color="warning"
            radius="lg"
            src="/eps-chart.png"
          />
        }
        subtitle={
          <p className="flex">
            2 issues to<span className="text-primary ml-1">fix now</span>
          </p>
        }
        title="Finance Application"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="4"
        aria-label="Education Website"
        startContent={
          <Avatar
            color="warning"
            radius="lg"
            src="/books.png"
          />
        }
        subtitle={
          <p className="flex">
            2 issues to<span className="text-primary ml-1">fix now</span>
          </p>
        }
        title="Education Website"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="5"
        aria-label="NFT Platform"
        startContent={
          <Avatar
            color="warning"
            radius="lg"
            src="/nft.png"
          />
        }
        subtitle={
          <p className="flex">
            No issues <span className="text-primary ml-1"></span>
          </p>
        }
        title="NFT Platform"
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
    </div>
    
  );
}
