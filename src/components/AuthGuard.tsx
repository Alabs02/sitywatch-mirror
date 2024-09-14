// import { useSelector } from "react-redux"
// import { useRouter } from "next/router"
// import { RootState } from "../app/store"
// import { ReactNode, useEffect } from "react"

// interface AuthGuardProps {
//   children: ReactNode
// }

// const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.auth.isAuthenticated,
//   )
//   const router = useRouter()

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/login") // Redirect to login page
//     }
//   }, [isAuthenticated, router])

//   // Only render children if authenticated
//   if (!isAuthenticated) {
//     return null // Or display a loading spinner until the redirect happens
//   }

//   return <>{children}</>
// }

// export default AuthGuard
