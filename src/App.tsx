import './App.css'
import { emptyEmployee, createEmployeeRepo, type Employee} from './services/api'
import ItemTable from './components/Table/ItemList'


function App() {
  const mysql = createEmployeeRepo("MYSQL");
  const pg = createEmployeeRepo("PG");
  return (
    <div className='App'>
      <h1>Employee Management</h1>
      <ItemTable<Employee> 
        itemName = "employee" 
        emptyItem={emptyEmployee}
        fetchItems={mysql.getEmployees}
        createRecord={mysql.createEmployee}
        updateRecord={mysql.updateEmployee}
        deleteRecord={mysql.deleteEmployee}
      />
      <h1>Employee Management POSTGRES</h1>
      <ItemTable<Employee> 
        itemName = "employee" 
        emptyItem = {emptyEmployee} 
        fetchItems={pg.getEmployees}
        createRecord={pg.createEmployee}
        updateRecord={pg.updateEmployee}
        deleteRecord={pg.deleteEmployee}
      />
    </div>
  )
}

export default App
