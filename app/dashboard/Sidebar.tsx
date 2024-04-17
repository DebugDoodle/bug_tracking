import React, { useState, useEffect } from 'react';
import Image  from 'next/image';
import { Roboto } from 'next/font/google';

interface Section {
  Id: number;
  Type: string;
  Section: string;
  LogoURL: string;
}

const Sidebar = () => {
  const [isSectionOpen, setIsSectionOpen] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await fetch('http://localhost:5294/api/fetchsection');
      const data: Section[] = await response.json(); 
      console.log(response);
      setSections(data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
  };

  return (
    <div className="bg-black h-full w-auto flex flex-col p-5">
      <div className="flex items-center text-3xl">
        <span className="py-10">Bug Tracking</span>
      </div>
      <div className="mt-24">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleSection}
        >
        <div className="flex items-center justify-between">
            <span className="text-xl text-gray-300">Sections</span>
            <span>
            {/*<Image src="/plusIconWhite.png" width={15} height={15} alt={""}/>*/}
            </span>
        </div>
        </div>
        {isSectionOpen && (
          <ul className="mt-4">
            {sections.map((section) => (
              <li key={section.Id} className="group mb-2 flex items-center cursor-pointer">
                <div className='group-hover:-rotate-3  ease-in duration-150 contrast-200 group-hover:contrast-100'>
                <Image  src={section.LogoURL} width={50} height={50} alt="Picture of the author"/>
                </div>
                <div className="px-2">
              {section.Section}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
