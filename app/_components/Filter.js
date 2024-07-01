"use client"
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import React from 'react'

function Filter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const activeFilter = searchParams.get("capacity") ?? "all"
    // console.log(activeFilter)
    function handelFilter(filter) {
        const params = new URLSearchParams(searchParams)
        params.set("capacity", filter)
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
    return (
        <div className=' border border-primary-800'>
            {/* <button className='px-5 py-2 hover:bg-primary-700' onClick={() => handelFilter("all")}>All cabins</button> */}
            {/* <button className='px-5 py-2 hover:bg-primary-700' onClick={() => handelFilter("small")}>1&mdash;3</button> */}
            {/* <button className='px-5 py-2 hover:bg-primary-700' onClick={() => handelFilter("medium")}>4&mdash;7</button> */}
            {/* <button className='px-5 py-2 hover:bg-primary-700' onClick={() => handelFilter("large")}>8&mdash;12</button> */}
            <Button filter="all" handelFilter={handelFilter} activeFilter={activeFilter}>All cabins</Button>
            <Button filter="small" handelFilter={handelFilter} activeFilter={activeFilter}>1&mdash;3</Button>
            <Button filter="medium" handelFilter={handelFilter} activeFilter={activeFilter}>4&mdash;7</Button>
            <Button filter="large" handelFilter={handelFilter} activeFilter={activeFilter}>8&mdash;12</Button>
        </div>
    )
}

function Button({ filter, handelFilter, activeFilter, children }) {
    return <button className={`px-5 py-2 hover:bg-primary-700s ${filter === activeFilter ? 'bg-primary-700 text-primary-50' : ""}`} onClick={() => handelFilter(filter)}>{children}</button>
}
export default Filter