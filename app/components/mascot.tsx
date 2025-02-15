'use client';

import Image from "next/image";

export default function Mascot (){
    return(
        <Image src="/images/realmascot.png" alt="Mascot" width={250} height={250}/>
    );
}