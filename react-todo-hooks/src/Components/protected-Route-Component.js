import authService from '../Serivces/auth-service'
import { Redirect, Route } from 'react-router-dom'
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
export const UserContext = React.createContext();

function ProtectRouteComponent(props) {
  let user = {}
  useEffect(() => {
    if (!authService.getLoginStatus()) {
      toast.error('Please login to continue.')
    }
    user = authService.getCurrentUser()
  });
  return (
    <Route path={props.path} render={data =>
      authService.getLoginStatus() ?
        (
          // <UserContext.Consumer user={user}>
          <props.component {...data}></props.component>
          // </UserContext.Consumer>
        ) :
        (<Redirect to={{ pathname: '/' }}></Redirect>)}>
    </Route>
  )
}
export default ProtectRouteComponent