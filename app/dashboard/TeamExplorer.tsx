import React from 'react';
import Image from 'next/image';
import EmailDisplay from '../icons/EmailDisplay';
import EmailSend from '../icons/EmailSend';
import ProjectList from './ProjectList';

const TeamExplorer = () => {
  return (
    <div className="top-0 right-0 h-full w-64 bg-white text-white rounded-lg">
      <div className="flex p-5 items-center">
        <Image src="/avatar.png" width={50} height={50} alt="Picture of the author" />
        <div className="flex">
          <div className="text-black ml-2">Name <br /><div className="text-gray-500 text-xs">Admin</div></div>
        </div>
      </div>
      <div className="text-black px-3 font-bold mt-5">
        Projects
        </div>

        <div className="text-black">
      <ProjectList />
      </div>
    </div>
  );
};

export default TeamExplorer;
