import React from "react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
export default async function Header() {
  const User = await currentUser();
  return (
    <nav className="flex justify-between items-center p-2 lg:px-20 w-[93%] h-[55px] lg:h-[70px] lg:w-[80%] mx-auto border border-black ">
      <div>
        <h3 className=" text-blue-500  lg:text-3xl">SmartPDF AI</h3>
      </div>

      <div className="flex gap-4">
        <div>
          <Link href="/">
            <h4 className="text-xs hover:text-blue-400">Home</h4>
          </Link>
        </div>

        <div>
          <h4 className="text-xs">Summeries</h4>
        </div>
      </div>
      <div>
        <Link href="/uploadpdf">
          <h4 className="text-xs hover:text-blue-400">Uplaod Pdf</h4>
        </Link>
      </div>
      {User ? (
        <div className="h-8 w-8 ">
          <UserButton/>
        </div>
      ) : (
        <div className="flex justify-around gap-2.5">
          <button className="w-20 h-9 bg-blue-300" >
          <SignUpButton/>
          </button>
          
          <button className="w-20 h-9 bg-blue-300" >
          <SignInButton/>
          </button>

        </div>
      )}
    </nav>
  );
}
