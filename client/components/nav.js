import { useContext } from "react"
import Link from "next/link"
import { UserContext } from "@/context"
import { useRouter } from "next/router"

const Nav = () =>{
   const [state, setState] = useContext(UserContext)

   const router = useRouter()

   const logout = () =>{
      window.localStorage.removeItem('auth')
      setState(null)
      router.push('/login')
   }
    return(
        <nav className="nav d-flex justify-content-end" style={{backgroundColor:"blue"}}>
             <Link legacyBehavior href="/">
                <a className="nav-link text-light">MERNCAMP</a>
             </Link>
             {state !== null ? (
               <>
               <Link legacyBehavior href="/user/dashboard">
                <a className="nav-link text-light">{state && state.user && state.user.name}</a>
               </Link>
               <a onClick={logout} className="nav-link text-light" style={{cursor:"pointer"}}>Logout</a>

               </>
             ) : (
               <>
               <Link legacyBehavior href="/login">
                <a className="nav-link text-light">Login</a>
               </Link>

               <Link legacyBehavior href="/register">
                <a className="nav-link text-light">Register</a>
               </Link>
             </> 

             )}

             

             
        </nav>
    )
}
export default Nav