import Mascot from "../components/mascot"
import ConstellationNetwork from "../components/constellation"

export default function Page() {
    return (
        <div className="flex h-screen mx-4 gap-4 py-4 justify-center items-center">
            <div className="w-48"></div>
            <ConstellationNetwork backgroundColor="bg-midnight-purple/0"/>
            <div className="bottom-0 left-0 fixed z-50">
                <Mascot />
            </div>
        </div>
    )
}