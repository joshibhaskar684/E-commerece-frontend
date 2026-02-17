import Sidebar from "@/components/Products/Sidebar/Sidebar";

export default function layout({ children }) {
    return (
        <>
       
                    {children}
                


            {/* <div className="flex flex-row justify-content-between">
<div className="border"> <Sidebar /></div>
              

                <div className="overflow-y-auto flex-1   ">

                    {children}</div>
            </div> */}

        </>
    )
}