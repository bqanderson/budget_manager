import Axios from 'axios'
import router from '@/router'

const BudgetManagerAPI = `http://${window.location.hostname}:3001`

export default {
  user: { authenticated: false },

  authenticate(context, credentials, redirect){ // context == Vue component | credentials == username&password | redirect == redirect path
    Axios.post(`${BudgetManagerAPI}/api/v1/auth`, credentials)
      .then(({ data: { token } }) => {  // Get token value from data response (the only data needed)
        context.$cookie.set('token', token, '1D') // Store token value as cookie (set to expire in 1 day)
        context.validLogin = true // Set components 'validLog' value to true
        this.user.authenticated = true  // Set user's object 'authenticated' value to true

        if(redirect) router.push(redirect)  // Redirect user to 'redirect' argument
      }).catch(({ response: { data } }) => {  // Otherwise...
        context.snackbar = true // ...Set component's 'snackbar' value to true, and...
        context.message = data.message  //  ...Set component's 'message' to error message
      })
  },

  signup(context, credentials, redirect){ // context == Vue component | credentials == username&password | redirect == redirect path
    Axios.post(`${BudgetManagerAPI}/api/v1/signup`, credentials)  // Use Axios to handle HTTP POST request to API
      .then(({ data: { token } }) => {  // Get token value from data response (the only data needed)
        context.$cookie.set('token', token, '1D') // Store token value as cookie (set to expire in 1 day)
        context.validSignup = true  // Set component's 'validSignup' value to true
        this.user.authenticated = true  // Set user's  object 'authenticated" value to true'

        if(redirect) router.push(redirect)  // Redirect user to 'redirect' argument
      }).catch(({ response: { data } }) => {  // Otherwise...
        context.snackbar = true // ...Set component's 'snackbar' value to true, and..
        context.message = data.message  // ...Set component's 'message' to error message
      })
  },

  CheckAuthentication(){  // Check to see if user is authenticated
    const token = document.cookie

    if(token) this.user.authenticated = true
    else this.user.authenticated = false
  },

  GetAuthenticationHeader(context){ // Return Authentication Header
    return `Bearer ${context.$cookie.get('token')}`
  }
}
