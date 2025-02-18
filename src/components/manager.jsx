import React, {useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';                                                         //React Toastify
import { v4 as uuidv4 } from 'uuid';


function Manager() {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form, setForm] = useState({site:"", username:"", password:""})
  const [passwordArray , setPasswordArray] = useState([])



  let getPasswords = async ()=>{
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords);
    setPasswordArray(passwords)
    
  }


  useEffect(()=>{
    getPasswords()
  },[])


  const showPassword = () => {
      setPasswordVisible(!passwordVisible);
  };


  const savePassword = async()=>{
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){

    // If any Such id Exist in DB 'Delete It", its for Edit
    await fetch("http://localhost:3000/", {method:"DELETE", headers: {"Content-Type":"application/json"}, body : JSON.stringify({id: form.id})})

    // console.log(form);
    setPasswordArray([...passwordArray, {...form, id:uuidv4() }])
    
    await fetch("http://localhost:3000/", {method:"POST", headers: {"Content-Type":"application/json"}, body : JSON.stringify({...form, id:uuidv4() })})
    
    // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id:uuidv4() }]))
    // console.log([...passwordArray, form]);

    setForm({site:"", username:"", password:"",id:""})
  }else{
    toast('❌ Password Not Saved!')
  }
  }


  const handleChange = (e)=>{
    setForm({...form, [e.target.name] : e.target.value})
  }


  const copyText = (text)=>{
    // Display Toast:
    toast('🦄 Copied To ClipBoard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    navigator.clipboard.writeText(text)
  }


  const deletePassword = async(id)=>{
    let c = confirm("Do you Really Want to Delete this Password")
    if(c){
    setPasswordArray(passwordArray.filter(item=> item.id !== id))
    // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=> item.id !== id)))
    let res = await fetch("http://localhost:3000/", {method:"DELETE", headers: {"Content-Type":"application/json"}, body : JSON.stringify({id})})
    
    // Display Toast:
    toast.error('❌ Password Deleted!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    }
  }


  const editPassword = (id)=>{
    setForm({...passwordArray.filter(i=>i.id===id)[0], id: id})
    setPasswordArray(passwordArray.filter(item=> item.id !== id))
  }




  return (
    <div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>

      {/* Background */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>



    {/* Main */}
    <div className="mycontainer px-4 md:px-8 lg:px-12">

      <h1 className="text-3xl md:text-4xl font-bold text-center text">
        <span className="text-green-400">&lt;</span>
        <span>PassOP</span>
        <span className="text-green-400">/&gt;</span>
        </h1>

      <p className="text-green-500 text-lg text-center">Your Own Password Manager</p>
      
      <div className="font-bold flex flex-col items-center p-4 text-white gap-7 !py-8 sm:gap-7">
        <input value={form.site} onChange={handleChange} name="site" className="rounded-full border-2 border-green-500 w-full !px-4 !py-1" type="text" placeholder="Enter Website Url"/>
        
      <div className="flex w-full justify-between gap-8 flex-col sm:flex-row">
          <input value={form.username} onChange={handleChange} name="username" className="rounded-full border-2 border-green-500 w-full !px-4 !py-1" type="text" placeholder="Enter Username" />
        <div className="relative flex items-center justify-center">
          <input value={form.password} onChange={handleChange} name="password" className="rounded-full border-2 border-green-500 w-full !px-4 !py-1 !pr-10" type={passwordVisible ? "text" : "password"} placeholder="Enter Password" />
          {/* <span class="absolute right-4 material-symbols-outlined !text-xl">visibility</span> */}
          <span className="absolute right-4 !mt-[7px] cursor-pointer" onClick={showPassword}>
            <lord-icon className="w-6"
            src="https://cdn.lordicon.com/dicvhxpz.json"
            trigger="hover"
            stroke="bold"
            state={passwordVisible ? "hover-cross" : ""}
            colors="primary:#ffffff,secondary:#66bb6a">
            </lord-icon>
          </span>
        </div>
      </div>
        
      <button onClick={savePassword} className="gap-2 flex justify-center items-center bg-green-500 rounded-full !px-6 !py-2 w-fit hover:bg-green-400 border-2 border-green-900 cursor-pointer">Add Password<lord-icon src="https://cdn.lordicon.com/sbnjyzil.json" trigger="hover" stroke="bold" colors="primary:#ffffff,secondary:#ffffff"></lord-icon></button>
      </div>




      <div className="passwords">
        <h2 className="font-bold text-2xl !py-4">Your Passwords</h2>

        {passwordArray.length === 0 && <div>No Passwords To Show</div>}
        {passwordArray.length != 0 && 
        
  <table className="table-auto w-full overflow-hidden mb-10">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="!py-2">Site</th>
            <th className="!py-2">Username</th>
            <th className="!py-2">Password</th>
            <th className="!py-2">Actions</th>
          </tr>
        </thead>
  
  
    <tbody>
      {passwordArray.map((item , index)=>{

      return <tr key={index}>

      <td className="text-center w-32 !py-2 border border-green-500">
        <div className="flex justify-center items-center gap-1">
          <a href={item.site} target="_blank">{item.site}</a> 
          <span className="!pt-[7px] cursor-pointer" onClick={()=>copyText(item.site)}>
            <lord-icon 
            className="w-5" 
            src="https://cdn.lordicon.com/fjvfsqea.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#ffffff,secondary:#66bb6a"
            ></lord-icon> 
          </span>
        </div>
      </td>
      
      <td className="text-center w-32 !py-2 border border-green-500">
        <div className="flex justify-center items-center gap-1">
          <span>{item.username}</span>
          <span className="!pt-[7px] cursor-pointer" onClick={()=>copyText(item.username)}>
            <lord-icon 
            className="w-5" 
            src="https://cdn.lordicon.com/fjvfsqea.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#ffffff,secondary:#66bb6a">
            </lord-icon> 
          </span>
        </div>
      </td>

      <td className="text-center w-32 !py-2 border border-green-500">
        <div className="flex justify-center items-center gap-1">
          <span>{"*".repeat(item.password.length)}</span>
          <span className="!pt-[7px] cursor-pointer" onClick={()=>copyText(item.password)}>
            <lord-icon 
            className="w-5" 
            src="https://cdn.lordicon.com/fjvfsqea.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#ffffff,secondary:#66bb6a">
            </lord-icon> 
          </span>
        </div>
      </td>

      <td className="text-center w-32 !py-2 border border-green-500">
        <div className="flex justify-center items-center gap-2">
          <span className="!pt-[7px] cursor-pointer" onClick={()=>editPassword(item.id)}>
          <lord-icon
          className="w-6" 
          src="https://cdn.lordicon.com/exymduqj.json"
          trigger="hover"
          stroke="bold"
          colors="primary:#ffffff,secondary:#08a88a"
          >
          </lord-icon>
          </span>
          <span className="!pt-[7px] cursor-pointer" onClick={()=>deletePassword(item.id)}>
          <lord-icon
          src="https://cdn.lordicon.com/hwjcdycb.json"
          className="w-6" 
          trigger="hover"
          stroke="bold"
          colors="primary:#ffffff,secondary:#08a88a">
          </lord-icon>
          </span>
        </div>
      </td>

    </tr>
    })}

  </tbody>


</table>

}
</div>
</div>
</div>
)}

export default Manager;