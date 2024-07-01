import Link from "next/link";
import Image from "next/image";
import logo from '@/public/logo.png';
export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-4 z-10">
            <Image src={logo} quality={100} height="60" width="60" alt="the wild oasis image"></Image>
            <span className="text-xl font-semibold text-purple-50">
                The Wila Oasis
            </span>
        </Link>
    )
}