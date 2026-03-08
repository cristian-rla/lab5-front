import './App.css'
import ItemList from './components/ItemList'
import { createEmployee, deleteEmployee, EmptyEmployee, getEmployees, updateEmployee, type Employee} from './services/api'
import CountryList from './components/countryItems/countryList'
import ItemTable from './components/Table/ItemList'


function App() {
  return (
    <div className='App'>
      <CountryList />
      <ItemTable<Employee> itemName = "employee" emptyItem = {EmptyEmployee} fetchItems ={getEmployees} updateRecord={updateEmployee} createRecord={createEmployee} deleteRecord={deleteEmployee}/>
    </div>
  )
}

export default App
