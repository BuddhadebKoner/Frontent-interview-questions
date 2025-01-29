import React, { useState } from 'react'
import OtpSection from './component/OtpSection'
import PhoneSection from './component/PhoneSection'

const App = () => {

  const [number, setNumber] = useState('')
  const [showOtp, setShowOtp] = useState(false)

  const handleNumberCHnage = (e) => {
    e.preventDefault()
    // check the number is 10 digit or not
    if (e.target.value.length > 10) {
      return
    }

    // check number or not
    if (isNaN(e.target.value)) {
      return
    } else {
      setNumber(e.target.value)
    }
  }

  const handleNumberSubmit = (e) => {
    e.preventDefault()
    // check the number is 10 digit or not
    if (number.length !== 10) {
      return
    }
    console.log(number)
    setNumber('')
    setShowOtp(true)
  }

  const onSubmitOtp = (otp) => {
    console.log(otp)
  }

  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center items-center bg-black text-white py-10'>
        {
          showOtp ? (
            <>
              <PhoneSection
                handleNumberCHnage={handleNumberCHnage}
                handleNumberSubmit={handleNumberSubmit}
                number={number}
              />
            </>
          ) : (
            <OtpSection
              length={4}
              onSubmit={onSubmitOtp}
            />
          )
        }
      </div>
    </>
  )
}

export default App