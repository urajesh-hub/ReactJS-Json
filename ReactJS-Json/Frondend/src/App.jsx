import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [users, setusers] = useState([])
  const [filteredUser, setFilterUser] = useState([])
  const [isModelOpen, setModelOpen] = useState(false)
  const [userData, setUserData] = useState({ empcode: "", name: "", age: "", department: "", email: "", salary: "" })

  const getAllusers = async () => {
    await axios.get("http://localhost:8000/users").then((res) => {

      setusers(res.data) // search empty display function all users
      setFilterUser(res.data) // filtered result display in map function


    })
  };


  useEffect(() => {
    getAllusers();
  }, []);

  //add user Function

  const handleAddrecord = () => {
    setUserData({ empcode: "", name: "", age: "", department: "", email: "", salary: "" })
    setModelOpen(true);
  }

  // close 

  const closeModel = () => {
    setModelOpen(false)
    getAllusers();
  }


  // Search  Function
  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUser = users.filter((user) => user.name.toLowerCase().includes(searchText) || user.department.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText) || user.salary.toString().includes(searchText));
    setFilterUser(filteredUser);
  }

  // Delete  Function

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are You Want to Delete?");
    if (isConfirmed) {
      await axios.delete(`http://localhost:8000/users/${id}`).then((res) => {
        setusers(res.data)
        setFilterUser(res.data)
      })

    }


  }

  //
  const handledata = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })

  }

  const handlsubmit = async (e) => {
    e.preventDefault();
    if (userData.id) {
      await axios.patch(`http://localhost:8000/users/${userData.id}`, userData).then((res) => {
        console.log(res)
      })

    } else {
      await axios.post("http://localhost:8000/users", userData).then((res) => {
        console.log(res)
      })

    }
    closeModel()
    setUserData({ empcode: "", name: "", age: "", department: "", email: "", salary: "" })


  }

  //upate function


  const updaterecord = (jsondata) => {
    setUserData(jsondata);
    setModelOpen(true)

  }

  return (
    <>
      <div className='container'>
        <h3>CRUD Application with React.Js and Node.Js</h3>
        <div className='input-search'>
          <input type="text" placeholder='search here' onChange={handleSearchChange} />
          <button className="btn green" onClick={handleAddrecord}>Add Records</button>
        </div>

        <table className='table'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>EMPCODE</th>
              <th>Name</th>
              <th>Age</th>
              <th>Department</th>
              <th>Email</th>
              <th>Salary</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {filteredUser && filteredUser.map((jsondata, index) => {
              return (
                <tr key={jsondata.id}>
                  <td>{index + 1}</td>
                  {/* <td>{jsondata.id}</td> */}
                  <td>{jsondata.empcode}</td>
                  <td>{jsondata.name}</td>
                  <td>{jsondata.age}</td>
                  <td>{jsondata.department}</td>
                  <td>{jsondata.email}</td>
                  <td>{jsondata.salary}</td>
                  <td><button className="btn green" onClick={() => updaterecord(jsondata)}>EDIT</button></td>
                  <td><button onClick={() => handleDelete(jsondata.id)} className="btn red"> DELETE</button></td>
                </tr>
              )
            })}

          </tbody>
        </table>
        {isModelOpen && (<div className='model'>
          <div className='model-content'>
            <span className='close' onClick={closeModel}>&times;</span>
            <h2>{userData.id ? "Update Record" : "Add Record"}</h2>

            <div className='input-group'>
              <label htmlFor='empcode'>Empcode</label>
              <input type="text" name='empcode' id='empcode' value={userData.empcode} onChange={handledata} />
            </div>

            <div className='input-group'>
              <label htmlFor='name'>Name</label>
              <input type="text" name='name' id='name' value={userData.name} onChange={handledata} />
            </div>

            <div className='input-group'>
              <label htmlFor='age'>Age</label>
              <input type="text" name='age' id='age' value={userData.age} onChange={handledata} />
            </div>

            <div className='input-group'>
              <label htmlFor='dept'>Department</label>
              <input type="text" name='department' id='dept' value={userData.department} onChange={handledata} />
            </div>

            <div className='input-group'>
              <label htmlFor='email'>Email</label>
              <input type="text" name='email' id='email' value={userData.email} onChange={handledata} />
            </div>

            <div className='input-group'>
              <label htmlFor='salary'>Salary</label>
              <input type="text" name='salary' id='salary' value={userData.salary} onChange={handledata} />
            </div>
            <button className='btn green' onClick={handlsubmit}>{userData.id ? "Update User" : "Add User"}</button>

          </div>
        </div>)}

      </div>


    </>
  )
}

export default App
