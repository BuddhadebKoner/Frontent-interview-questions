import React, { useEffect, useRef, useState } from 'react'

const staticClassname = 'w-[60px] mt-5 px-3 py-3 border border-gray-500 rounded text-2xl text-center  focus:outline-none focus:ring-0 rounded-md'

const OtpSection = ({ length = 6, onSubmit, otpIs, setShowOtp }) => {
   const [otp, setOtp] = useState(new Array(length).fill(''))
   const [otpError, setOtpError] = useState(false)

   // first focus to the first input field
   const inputRefs = useRef([])
   useEffect(() => {
      inputRefs.current[0].focus();
   }, [])

   const handleChnage = (index, e) => {
      e.preventDefault()
      const value = e.target.value
      if (isNaN(value)) return

      const newOtp = [...otp]
      // allow only one digit
      newOtp[index] = value.substring(value.length - 1)
      setOtp(newOtp)

      // submit otp
      const compibeOtp = newOtp.join('');
      // console.log(compibeOtp, newOtp)
      if (compibeOtp.length === length) {
         if (otpIs !== compibeOtp) {
            setOtpError(true)
            return
         }
         setShowOtp(false)
         onSubmit(compibeOtp);
      }

      // move to next input field after entering the value
      if (value && index < length - 1 && inputRefs.current[index + 1]) {
         inputRefs.current[index + 1].focus()
      }
   }

   const handleClick = (index, e) => {
      e.preventDefault()
      inputRefs.current[index].setSelectionRange(1, 1)

      // first fild back fild then move to the previous input field
      if (index > 0 && !otp[index - 1]) {
         inputRefs.current[otp.indexOf("")].focus()
      }

      // move to next blank fild skip the filled fild
      if (otp[index]) {
         let nextIndex = otp.findIndex((val, i) => i > index && val === "");
         if (nextIndex !== -1 && inputRefs.current[nextIndex]) {
            inputRefs.current[nextIndex].focus();
         }
      }
   }

   const handleKeyDown = (index, e) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
         // move to previous input field after deleting the value
         inputRefs.current[index - 1].focus();
      }
   }


   return (
      <>
         <div className='w-full h-screen flex flex-col justify-center items-center bg-black text-white py-10'>
            <h1 className='text-4xl font-semibold'>Enter OTP : {otpIs}</h1>
            <form
               type='submit'
               className='flex flex-col justify-between'>
               <div className='flex justify-between gap-5'>
                  {
                     otp.map((value, index) => {
                        return (
                           <input
                              key={index}
                              value={value}
                              ref={(input) => inputRefs.current[index] = input}
                              type="text"
                              placeholder='*'
                              className={staticClassname}
                              onChange={(e) => handleChnage(index, e)}
                              onClick={(e) => handleClick(index, e)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                           />
                        )
                     })
                  }
               </div>
            </form>
            {otpError && <p className='text-red-500 pt-5'>OTP is not valid</p>}
         </div>
      </>
   )
}

export default OtpSection