import * as React from 'react';

const permissions = ['USER', 'PRODUCT', 'ORDER']
const PermissionContext = React.createContext(permissions)

const UserMemu: React.FunctionComponent = props => (
  <PermissionContext.Consumer>
    {list => {
      if (list.indexOf('USER') > -1) {
        return <h1>HAS USER MENU</h1>
      } else {
        return <h1>NO USER MENU</h1>
      }
    }}
  </PermissionContext.Consumer>
)

const ProductMemu: React.FunctionComponent = props => (
  <PermissionContext.Consumer>
    {list => {
      if (list.indexOf('PRODUCT') > -1) {
        return <h1>HAS PRODUCT MENU</h1>
      } else {
        return <h1>NO PRODUCT MENU</h1>
      }
    }}
  </PermissionContext.Consumer>
)

const OrderMemu: React.FunctionComponent = props => (
  <PermissionContext.Consumer>
    {list => {
      if (list.indexOf('ORDER') > -1) {
        return <h1>HAS ORDER MENU</h1>
      } else {
        return <h1>NO ORDER MENU</h1>
      }
    }}
  </PermissionContext.Consumer>
)

interface IState {
  permissions: string[]
}

export default class Navigator extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = { permissions }
  }

  private addUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const p = this.state.permissions
    if (p.indexOf('USER') < 0) {
      p.push('USER')
      this.setState({ permissions: p })
    }
    console.log(p)
  }
  private removeUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const p = this.state.permissions
    if (p.indexOf('USER') > -1) {
      p.splice(p.indexOf('USER'), 1)
      this.setState({ permissions: p })
    }
    console.log(p)
  }

  private addProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const p = this.state.permissions
    if (p.indexOf('PRODUCT') < 0) {
      p.push('PRODUCT')
      this.setState({ permissions: p })
    }
    console.log(p)
  }
  private removeProduct = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const p = this.state.permissions
    if (p.indexOf('PRODUCT') > -1) {
      p.splice(p.indexOf('PRODUCT'), 1)
      this.setState({ permissions: p })
    }
    console.log(p)
  }
  private addOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const p = this.state.permissions
    if (p.indexOf('ORDER') < 0) {
      p.push('ORDER')
      this.setState({ permissions: p })
    }
    console.log(p)
  }
  private removeOrder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const p = this.state.permissions
    if (p.indexOf('ORDER') > -1) {
      p.splice(p.indexOf('ORDER'), 1)
      this.setState({ permissions: p })
    }
    console.log(p)
  }
  public render() {
    if (this.state.permissions.length === 0) {
      throw new Error('no data')
    }
    return (
      <div>
        <PermissionContext.Provider value={permissions}>
          <UserMemu />
          <ProductMemu />
          <OrderMemu />
        </PermissionContext.Provider>
        <button onClick={this.addUser}>add user permission</button>
        <button onClick={this.removeUser}>remove user permission</button>
        <button onClick={this.addProduct}>add product permission</button>
        <button onClick={this.removeProduct}>remove product permission</button>
        <button onClick={this.addOrder}>add order permission</button>
        <button onClick={this.removeOrder}>remove order permission</button>
      </div>
    )
  }
}
