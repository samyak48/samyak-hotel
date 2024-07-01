"use server";

import { signIn } from "./auth";
import { signOut } from "./auth";
import { auth } from "@/app/_lib/auth"
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
export async function updateGuest(formData) {
    const session = await auth()
    if (!session) {
        throw new Error("Not authenticated")
    }
    console.log(session)
    const nationalID = formData.get("nationalId")
    const [nationality, countryFlag] = formData.get("nationality").split('%')
    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
        throw new Error("Invalid national ID format")
    const updateData = { nationality, countryFlag, nationalID }
    // console.log(updateData)
    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestID)
        .select()
        .single();

    if (error) {
        throw new Error('Guest could not be updated');
    }
    revalidatePath("/account/profile")
}
export async function createBooking(bookingData, formdata) {
    // console.log(formdata)
    const session = await auth()
    if (!session) {
        throw new Error("Not authenticated")
    }
    const randomId = Math.ceil(Math.random() * 1000)
    const newBooking = {
        ...bookingData,
        guestId: session.user.guestID,
        numGuests: Number(formdata.get("numGuests")),
        observations: formdata.get("observations").slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        isPaid: false,
        hasBreakfast: false,
        status: "unconfirmed",
        id: randomId
    }
    // console.log(newBooking)
    const { error } = await supabase
        .from('bookings')
        .insert([newBooking])
        // So that the newly created object gets returned!
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be created');
    }
    revalidatePath(`/cabins/${bookingData.cabinId}`)
    redirect('/cabins/thankyou')
}
export async function deleteReservation(bookingId) {
    const session = await auth()
    if (!session) {
        throw new Error("Not authenticated")
    }
    const guestBookings = await getBookings(session.user.guestID)
    const guestBookingsIds = guestBookings.map((booking) => booking.id)
    if (!guestBookingsIds.includes(bookingId))
        throw new Error("Guest does not have this booking")
    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);
    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }
    revalidatePath("/account/reservations")
}
export async function updateBooking(formData) {
    // console.log(formData)
    //1)Auhentication
    const session = await auth()
    if (!session) {
        throw new Error("Not authenticated")
    }
    //2) Authorization
    const guestBookings = await getBookings(session.user.guestID)
    const guestBookingsIds = guestBookings.map((booking) => booking.id)
    const bookingId = Number(formData.get('bookingId'))

    if (!guestBookingsIds.includes(bookingId))
        throw new Error("Guest does not have this booking")

    //3) Update booking data
    const updateData = { numGuests: Number(formData.get('numGuests')), observations: formData.get('observations').slice(0, 1000) }

    //4) Update booking in the database 
    const { error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }

    //5)revalidation
    revalidatePath(`/account/reservations/edit/${bookingId}`)
    revalidatePath('/account/reservations')

    redirect('/account/reservations')
}
export async function signInAction() {
    await signIn('google', { redirectTo: "/account" })
}
export async function signOutAction() {
    await signOut({ redirectTo: "/" });
}