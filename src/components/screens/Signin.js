import React, {useState, useContext, } from "react";
import NavBar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import {UserContext} from "../../App"
import M from "materialize-css";

const Signin = ()=>{

    const {state, dispatch} = useContext(UserContext)
    const nevigate = useNavigate()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const PostData = ()=>{
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html:"Invalid email", classes:"#f44336 red"})
        }
        fetch("https://mernback-4fib.onrender.com/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password:password,
                email:email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html:data.error, classes:"#f44336 red"})
            }
            else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                M.toast({html:"Signedin success", classes:"#64dd17 light-green accent-4"})
                nevigate('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div>
            <NavBar />
            <div className="mycard">
                <div className="card auth-card input-field">
                    <h2>Instagram</h2>
                    <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1 " onClick={()=>PostData()}>Login</button>
                    <h5><Link to="/signup">Create new account</Link></h5>
                </div>
            </div>
        </div>
    )
}

export default Signin