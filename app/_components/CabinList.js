import React from 'react'
import CabinCard from './CabinCard'
import { getCabins } from '../_lib/data-service'

async function CabinList({ filter }) {

    const cabins = await getCabins()
    let displayCabins;
    if (filter === "all") {
        displayCabins = cabins
    }
    if (filter === "small") {
        displayCabins = cabins.filter(cabin => cabin.maxCapacity <= 3)
    }
    if (filter === "medium") {
        displayCabins = cabins.filter(cabin => cabin.maxCapacity > 3 && cabin.maxCapacity <= 7)
    }
    if (filter === "large") {
        displayCabins = cabins.filter(cabin => cabin.maxCapacity > 7)
    }
    if (!cabins.length) return null;
    return (
        <div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
                {displayCabins.map((cabin) => (
                    <CabinCard cabin={cabin} key={cabin.id} />
                ))}
            </div>
        </div>
    )
}
export default CabinList