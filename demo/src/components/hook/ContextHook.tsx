import * as React from 'react';

const permissions = ['USER']
const PermissionContext = React.createContext(permissions)

const UserMenu: React.FunctionComponent = props => {
  const list: string[] = React.useContext(PermissionContext)
  return (
    <>
      {list.indexOf('USER') > -1 ? (
        <h1>HAS USER MENU</h1>
      ) : (
        <h1>NO USER MENU</h1>
      )}
    </>
  )
}

const ContextHook: React.FunctionComponent = () => {
  const [info, setInfo] = React.useState(permissions)

  const addUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (info.indexOf('USER') < 0) {
      setInfo([...info, 'USER'])
    }
  }

  const removeUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (info.indexOf('USER') > -1) {
      info.splice(info.indexOf('USER'), 1)
      console.log('in:', info)
      setInfo([...info])
    }
  }

  return (
    <div>
      <PermissionContext.Provider value={info}>
        <UserMenu />
      </PermissionContext.Provider>
      <button onClick={addUser}>add user permission</button>
      <button onClick={removeUser}>remove user permission</button>
    </div>
  )
}
export default ContextHook
