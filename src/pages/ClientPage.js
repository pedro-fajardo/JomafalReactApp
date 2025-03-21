import { useState } from "react";
import ClientList from "../components/ClientList";

function ClientPage() {
   const [isToRefreshData, setIsToRefreshData] = useState(true);

   return (
      <div className="max-w-full px-4 sm:px-6 lg:px-8 mx-auto">
         <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <div>
               <ClientList
                  isToRefreshData={isToRefreshData}
                  setIsToRefreshData={setIsToRefreshData}
               />
            </div>
         </div>
      </div>
   );
}

export default ClientPage;
