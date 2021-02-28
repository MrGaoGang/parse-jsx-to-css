import React, { PureComponent } from 'react'

class Demo extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-container--user-name"></div>
                <div className="login-container--password"></div>
            </div>
        )
    }
}

export default Demo