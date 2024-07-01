import React from 'react'
import DateSelector from './DateSelector'
import ReservationForm from './ReservationForm'
import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service'
import { auth } from '../_lib/auth'
import LoginMessage from './LoginMessage'

async function Reservations({ cabin }) {
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id)
    ])
    const session = await auth()
    return (
        <div>
            <div>
                <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>
                <div className="grid grid-cols-2 border-purple-800 min-h-[400px]">
                    <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
                    {session?.user ? <ReservationForm cabin={cabin} user={session.user} /> : <LoginMessage />}
                </div>
            </div>
        </div>
    )
}

export default Reservations