import React,{useState} from "react";

function EntryForm() 
{
  const [user,setuser] = useState({name:''})

  const handleChange = (e) =>
    {
    const {name,value} = e.target;
    setuser((prevUser) => ({ ...prevUser,[name]: value}));
  }

    return(
        <div>
            <h1 style={{ color: 'red', backgroundColor: 'yellow', fontSize: 20 }}>This is is my Entry Form</h1>
            <input type='text' name='name' id='name' value={user.name} onChange={handleChange} placeholder='Enter Your Name' /><br />   
            <input type='text' name='email' id='email' value={user.email} onChange = {handleChange} placeholder="Enter Your Email" /><br />
            <p style={{color:user.name ? 'red':'green'}}>{user.name} <br />{user.email}</p>
            {/* <p style={{color:'green',backgroundColor:'red',fontSize:20}}>{user.name} <br />{user.email}</p> */}
        </div>

        
    );
}

export default EntryForm;