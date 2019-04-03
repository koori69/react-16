import * as React from 'react';

interface State {
  count: number
  time: string
}
const colors: string[] = [
  '#FFBBFF',
  '#EEAEEE',
  '#CD96CD',
  '#E066FF',
  '#D15FEE',
  '#B452CD',
  '#7A378B'
]

// const Count: React.FunctionComponent = () => {
//   const [count, setCount] = React.useState(0)
//   const [time, setTime] = React.useState(new Date().toLocaleTimeString())
//   return (
//     <div>
//       <p>
//         You Clicked {count} Times, Updated At {time}
//       </p>
//       <button
//         onClick={() => {
//           setCount(count + 1)
//           setTime(new Date().toLocaleTimeString())
//         }}
//       >
//         Click Me
//       </button>
//     </div>
//   )
// }

const Count: React.FunctionComponent = () => {
  const [info, setInfo] = React.useState<State>({
    count: 0,
    time: new Date().toLocaleTimeString()
  })
  const [hot, setHot] = React.useState('Hot')
  const color = colors[info.count % colors.length]
  React.useEffect(() => {
    document.title = `You clicked ${info.count} times`
    setHot(`Hot ${info.count % colors.length}`)
  })

  return (
    <div>
      <p>
        You Clicked {info.count} Times, Updated At {info.time}
      </p>
      <p>
        <label
          id='hot'
          style={{
            backgroundColor: color,
            width: '20px',
            height: '20px',
            color: 'white'
          }}
        >
          {hot}
        </label>
      </p>
      <button
        onClick={() => {
          setInfo({
            count: info.count + 1,
            time: new Date().toLocaleTimeString()
          })
        }}
      >
        Click Me
      </button>
    </div>
  )
}
export default Count
