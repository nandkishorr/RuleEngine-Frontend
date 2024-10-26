import { useState } from "react";
import Overview from "./Overview";
import Combine from "./Combine";
import { Toaster } from "react-hot-toast";

function Home() {
  const [data, setData] = useState(<Overview/>);
  return (
    <div className='flex flex-row '>
    <div className="w-[12rem] h-screen pr-5 py-5 left-0 top-0 border-r border-zinc-900 border-opacity-10 flex-col items-center flex sticky">
      <div className="text-3xl font-bold text-gray-700">Rule Engine</div>
      <div className='mr-16 text-zinc-900 text-opacity-40 text-sm pt-10 p-2'>Dashboard</div>
      <button onClick={()=>{
        setData(<Overview/>)
      }}  className='mr-2 ml-6 hover-bg-zinc-900 hover-bg-opacity-5 w-40 px-6 py-0.5 rounded-lg text-sm'><div className='flex'><img src='./overview.svg' alt='overviewicon' className='mr-1'/>Overview</div></button>
      <button onClick={
        ()=>{
          setData(<Combine/>)
        }
      }className='mr-2 ml-6 hover-bg-zinc-900 hover-bg-opacity-5 w-40 px-6 py-0.5 rounded-lg text-sm mt-4'><div className='flex'><img src='./create.svg' alt='createprofile' className='mr-1'/>Combine Rule</div></button>
    </div>
    <div className="w-full ">
      <Toaster position="top-right" />
      {data}
    </div>
  </div>
  )
}

export default Home
