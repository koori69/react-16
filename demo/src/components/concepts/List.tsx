import * as React from 'react';

const name = ['Tom', 'Jim', 'Dean']

export default class List extends React.Component {
  public render() {
    return (
      <div>
        {name.map((item: string) => (
          <label key={item}>{item}</label>
        ))}
      </div>
    )
  }
}
