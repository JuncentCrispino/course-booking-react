import React from 'react'
import { Puff } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className='absolute w-full h-screen flex justify-center items-center'>

      <Puff
        height="80"
        width="80"
        radius={1}
        color="#676FA3"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}
