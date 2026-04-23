import { useState } from "react"
import Header from "./components/Header"
import AddExpenseModal from "./components/AddExpenseModal";

function App() {
 const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  return (
    <div className="min-h-screen">
      <Header setShowAddExpenseModal={setShowAddExpenseModal}/>
      {showAddExpenseModal ? <AddExpenseModal 
      showAddExpenseModal={showAddExpenseModal}
        setShowAddExpenseModal={setShowAddExpenseModal}
      /> : null}
    </div>
  
  )
}

export default App
