import Cabin from "@/app/_components/Cabin";
import Reservations from "@/app/_components/Reservations";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
    const { name } = await getCabin(params.cabinid)
    return { title: `Cabin ${name}` }
}

export async function generateStaticParams() {
    const cabins = await getCabins();
    const ids = cabins.map((cabins) => ({ cabinid: String(cabins.id) }))
    // console.log(ids)
    return ids;
}

export default async function Page({ params }) {
    const cabin = await getCabin(params.cabinid)


    return (
        <div className="max-w-6xl mx-auto mt-8">
            <Cabin cabin={cabin}></Cabin>
            <Suspense fallback={<Spinner />}>
                <Reservations cabin={cabin} />
            </Suspense>

        </div>
    );
}
