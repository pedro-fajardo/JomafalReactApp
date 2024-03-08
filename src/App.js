import TopBar from "./components/TopBar";
import Card from "./components/Card"

function App() {
   return (
      <div>
         <TopBar />
         <div className="card-list">
            <h2>Lista de Equipamentos:</h2>
            <Card />
         </div>
      </div>
   );
}

export default App;
