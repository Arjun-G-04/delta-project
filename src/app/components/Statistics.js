export default function Statistics() {
    return <div>
        <div className="mx-4 flex flex-row gap-4">
            <div className="cursor-pointer flex flex-col p-2 hover:scale-[1.02] duration-500 ease-in-out w-1/2 h-[20vh] mt-5 bg-primary/20 border-primary border-[1px] rounded-md backdrop-blur-sm">
                <h1 className="text-2xl font-ubuntu text-text">Registered Students</h1>
                <h1 className="font-poppins text-5xl mt-auto">10000</h1>
            </div>
            <div className="cursor-pointer flex flex-col p-2 hover:scale-[1.02] duration-500 ease-in-out w-1/2 h-[20vh] mt-5 bg-primary/20 border-primary border-[1px] rounded-md backdrop-blur-sm">
                <h1 className="text-2xl font-ubuntu text-text">Hostels</h1>
                <h1 className="font-poppins text-5xl mt-auto">10</h1>
            </div>
        </div>
        <div className="mx-4 flex flex-row gap-4">
            <div className="flex flex-col p-2 hover:scale-[1.02] duration-500 ease-in-out w-1/2 h-[20vh] mt-5 bg-primary/20 border-primary border-[1px] rounded-md backdrop-blur-sm">
                <h1 className="text-2xl font-ubuntu text-text">Alloted Students</h1>
                <h1 className="font-poppins text-5xl mt-auto">5000</h1>
            </div>
            <div className="flex flex-col p-2 hover:scale-[1.02] duration-500 ease-in-out w-1/2 h-[20vh] mt-5 bg-primary/20 border-primary border-[1px] rounded-md backdrop-blur-sm">
                <h1 className="text-2xl font-ubuntu text-text">Current Allotment</h1>
                <h1 className="font-poppins text-4xl mt-auto text-red-400">2022-23</h1>
            </div>
        </div>
    </div>
}