import { useState } from "react";
import ClientList from "../components/ClientList";


function ClientPage() {
   const [isToRefreshData, setIsToRefreshData] = useState(true);

   return (
      <div>
         <div className="card-list">
            <div className="flex flex-row pb-2 w-full">
               <div className="flex flex-col w-1/2"> {/* Align to the start */}
                  <div className="flex flex-row justify-start">
                     <h2>Lista de Clientes</h2>
                  </div>
               </div>
            </div>

            
            <div><ClientList isToRefreshData={isToRefreshData} setIsToRefreshData={setIsToRefreshData} /></div>
         </div>
      </div>
   );
}

export default ClientPage;
