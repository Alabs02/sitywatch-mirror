import React, { useEffect } from "react"
import { useAuthStore } from "@/store"
import { useRouter } from "next/router"

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const { isLoggedIn } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
      if (!isLoggedIn) {
        // Check if the current route is the login page
        if (router.pathname !== "/login") {
          router.replace("/login") 
        }
      }
    }, [isLoggedIn, router])

    if (!isLoggedIn) {
      return null 
    }

    return <WrappedComponent {...props} />
  }

  return AuthenticatedComponent
}

export default withAuth
