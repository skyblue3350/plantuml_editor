import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import IndexPage from './routes/indexPage'


export interface Props {
}

export interface State {
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    render(): JSX.Element {
        return (
            <Router basename='/'>
                <Route render={(routeProps) => <IndexPage {...routeProps} />} />
            </Router>

        )
    }
}
