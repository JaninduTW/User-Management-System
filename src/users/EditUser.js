import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';



export default function EditUser() {

       let navigate=useNavigate()

       const {id}=useParams()

       const [user, setUser] = useState({
          name:"",
          username:"",
          email:""  
       })

        const{name,username,email}= user    

        const onInputChange=(e)=>{
             setUser ({...user,[e.target.name]:e.target.value});
        };

        useEffect(()=>{
            loadUser();
        },[]);


        const onSubmit= async (e) =>{
              e.preventDefault();
              await axios.put(`http://localhost:8080/user/${id}`, user)
              navigate("/")
        };


        const loadUser = async ()=> {
            const result=await axios.get(`http://localhost:8080/user/${id}`) 
            setUser(result.data) 
        }

  return (
    <div className='Container'>   
    
        <div className='row' >
 
               <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow '>
                <h2 className='text-center m-4' > Edit User </h2>

                 <form  onSubmit = {(e) => onSubmit(e)} >
                 <div className='mb-3' > 
                    <label htmlFor='Name' className='form-label mt-3' >  Name </label>
                    <input type={'text'} className="form-control" placeholder="Enter your name" name="name" value={name} onChange={(e) => onInputChange(e) } />
                    <label htmlFor='Username' className='form-label mt-4 ' >  Username </label>
                    <input type={'text'} className="form-control" placeholder="Enter your username" name="username" value={username} onChange={(e) => onInputChange(e) } />
                    <label htmlFor='Email' className='form-label mt-4 ' >  Email Address </label>
                    <input type={'text'} className="form-control" placeholder="Enter your email address" name="email" value={email} onChange={(e) => onInputChange(e) } />

                     

                 </div>

                 <button  type="submit" className='btn btn-outline-primary mt-4' > Submit </button>
                 <Link   className='btn btn-outline-danger mx-3 mt-4 ' to="/" > Cancel </Link>   
                     
                 </form>
               </div>

        </div>

     </div>
  )
}
