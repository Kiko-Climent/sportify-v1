import React from "react";

const Nav = () => {
  return (
    <nav className="fixed w-full px-3 flex justify-between text-[#cbf789] tracking-wider blur-[0.5px]">
      <h1 className="text-3xl py-2 scale-y-150">sportify</h1>
      <div className="flex-col text-xs leading-3 align-top font-bold py-3 scale-y-150">
        <ul>
          <li>Wednesday 14th</li>
          <li>Berlin | 14°C</li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav;