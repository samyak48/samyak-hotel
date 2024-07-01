import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service"

export async function GET(request, { params }) {
    const { cabinid } = params
    // return Response.json({ test: "test" })
    try {
        const [cabin, bookedDates] = await Promise.all(
            [
                getCabin(cabinid),
                getBookedDatesByCabinId(cabinid)
            ]
        )
        return Response.json({ cabin, bookedDates })
    } catch (err) {
        return Response.json({ message: "cabin not found" })
    }
}