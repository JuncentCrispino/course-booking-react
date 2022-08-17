import React from 'react'
import Chance from 'chance'
import _ from 'lodash'
import { useEffect } from 'react'
export default function Home() {
  // const chance = new Chance()
  // const infoArr = []
  // for (let i = 0; i < 50; i++) {
  //   infoArr.push({
  //     name: chance.word(),
  //     description: chance.paragraph(),
  //     instructor: chance.name(),
  //     schedule: [chance.weekday(), chance.weekday(), chance.weekday()],
  //     availableSlots: chance.integer({ min: 1, max: 50 }),
  //     price: chance.integer({ min: 10000, max: 50000 }),
  //   })
  // }
  // const uniqueInfoArr = _.uniqBy(infoArr, 'name')
  // useEffect(() => {
  //   (async () => {
  //     const addCoursesReq = await Promise.all(uniqueInfoArr.map(async (info) => {
  //       const dataReq = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/course`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  //         },
  //         body: JSON.stringify(info)
  //       })
  //       const dataRes = await dataReq.json()
  //       return dataRes
  //     }))
  //     console.log(addCoursesReq)
  //   })();
  // }, [])
  return (
    <div>Home</div>
  )
}
