// @flow
import React, { PureComponent } from 'react'
import logo from './logo.svg'
import Literal from './Literal'

type State = {
  mouseX: number,
  mouseY: number
}

class App extends PureComponent<any, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      mouseX: 0,
      mouseY: 0
    }
  }

  handler = (event: MouseEvent) => {
    this.setState({
      mouseX: event.pageX,
      mouseY: event.pageY
    })
  }

  componentWillMount() {
    this.setState({
      mouseX: 300,
      mouseY: 300
    })
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handler)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handler)
  }

  render() {
    const { mouseX, mouseY } = this.state

    return (
      <div>
        <div
          className="imgContainer"
          style={{
            top: mouseY - 42,
            left: mouseX - 50
          }}
        >
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <div className="instructions">
          <Literal content="I will follow your mouse!" />
        </div>
      </div>
    )
  }
}

module.exports = App
