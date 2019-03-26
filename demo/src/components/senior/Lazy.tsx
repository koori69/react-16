import * as React from 'react';

const MyLabel = React.lazy(() => import('../concepts/Label'))
export default class Lazy extends React.Component {
  public render() {
    return (
      <div>
        <React.Suspense fallback='Loading...'>
          <MyLabel />
        </React.Suspense>
      </div>
    )
  }
}
