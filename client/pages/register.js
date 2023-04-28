import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import {Modal} from "antd"
import Link from "next/link"
import AuthForm from "@/components/forms/AuthForm"

const Register = () =>{
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secret, setSecret] = useState('')
    const [ok, setOk] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClick = async (e) =>{
        e.preventDefault()
        try{
            setLoading(true)
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`,{
                name,
                email,
                password,
                secret
    
            })
            setName("")
            setEmail("")
            setPassword("")
            setSecret("")
            setOk(data.ok)
            setLoading(false)

        }
        catch(err){
            toast.error(err.response.data)
            setLoading(false)
        }
      

    }

    return(
        <>
             <div className="container-fluid">
            <div className="row py-5 text-light bg-default-image">
                <div className="col text-center">
                    <h1>Register Page</h1>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <AuthForm handleClick={handleClick}
                              name={name}
                              setName={setName}
                              email={email}
                              setEmail={setEmail}
                              password={password}
                              setPassword={setPassword}
                              secret={secret}
                              setSecret={setSecret}
                              loading={loading}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Modal title='congratulations!'
                           open={ok}
                           onCancel={() => setOk(false)}
                           footer={null}
                    
                    >
                        <p>You have successfully registered.</p>
                        <Link legacyBehavior href='/login'>
                            <a className="btn btn-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">Already registered? <Link legacyBehavior href='/login'>
                            <a>Login</a>
                        </Link></p>
                </div>
            </div>
        </div>
        </>
       
    )
    
}
export default Register