import DataKeuangan from "@/components/DataKeuangan";
import Navbar from "@/components/Navbar";
export const dynamic = 'force-dynamic'

export default function page() {
    return (
        <div>
            <Navbar />
            <DataKeuangan/>
        </div>
    );
}
