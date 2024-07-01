"use client"
import React from 'react'
import ReservationCard from './ReservationCard'
import { useOptimistic } from 'react';
import { deleteReservation } from '../_lib/actions';

function ReservationList({ bookings }) {
    const [optimisticBookings, optimisticDelete] = useOptimistic(
        bookings, (curBookings, bookingId) => {
            return curBookings.filter((booking) => booking.id !== bookingId)
        }
    )
    async function handelDelete(bookingId) {
        console.log(bookingId)
        optimisticDelete(bookingId)
        await deleteReservation(bookingId)
    }
    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard booking={booking} onDelete={handelDelete} key={booking.id} />
            ))}
        </ul>
    )
}

export default ReservationList