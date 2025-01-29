import React from 'react'

const PhoneSection = (
   {
      handleNumberCHnage,
      handleNumberSubmit,
      number
   }) => {
   return (
      <>
         <h1 className='text-4xl font-semibold'>Enter Your Mobile Number</h1>
         <form
            type='submit'
            className='w-1/3 flex flex-col'>
            <input
               onChange={handleNumberCHnage}
               value={number}
               type='text'
               className='mt-5 px-3 py-3 border border-gray-500 rounded text-2xl'
               placeholder='Mobile Number'
            />
            <button
               onClick={handleNumberSubmit}
               type='button'
               className='mt-5 px-3 py-3 bg-blue-500 text-white rounded cursor-pointer'>
               Send Otp
            </button>
         </form>
      </>
   )
}

export default PhoneSection