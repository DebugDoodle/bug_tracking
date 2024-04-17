'use client'
import Image from "next/image";
import Dashboard  from "./dashboard/dashboard";
import {NextUIProvider} from "@nextui-org/react";


export default function Home() {
  return (
    <div>
      <NextUIProvider>
        <Dashboard/>
      </NextUIProvider>
    </div>
  );
}
