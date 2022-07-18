import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import UserForm from './components/UserForm'
import UsersList from './components/UsersList'

function App() {

  const [ users , setUsers ] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [ isFormShown, setIsFormShown ] = useState(false)

  const getUsers = () =>{
    axios.get('https://users-crud1.herokuapp.com/users/')
    .then( res => setUsers(res.data))
  }

  useEffect(()=>{
    getUsers()
  },[])

  const addUser = user =>{
    axios.post('https://users-crud1.herokuapp.com/users/',user)
    .then(()=>getUsers())
  }

  const deleteUser = id =>{
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
    .then(()=>getUsers())
  }

  const selectUser = user =>{
    setSelectedUser(user)
    toggleModalForm()
  }

  const deselectUser = () => setSelectedUser(null)

  const updateUser = user =>{
    axios.put(`https://users-crud1.herokuapp.com/users/${selectedUser.id}/`,user)
    .then(()=>{
      getUsers()
      deselectUser()
    })
  }

  const toggleModalForm = ()=>{
    setIsFormShown(!isFormShown)
  }


  return (
    <div className='app'>
      <div className='header'>
      <h1>Users</h1>
      <button onClick={()=>toggleModalForm()}>
        <i className="fa-solid fa-plus fa-lg"></i>
        <p>Add New User</p>
      </button>
      </div>
      {isFormShown && (
              <UserForm
              addUser={addUser}
              selectedUser = {selectedUser}
              updateUser = {updateUser}
              toggleModalForm = {toggleModalForm}
              deselectUser = {deselectUser}
              />
      )}
      <UsersList
       users={users}
       deleteUser={deleteUser}
       selectUser={selectUser}
       />
       <div className='footer'>
       <h4>Coded by Oscar Solorzano</h4>
       </div>
    </div>
  )
}

export default App
