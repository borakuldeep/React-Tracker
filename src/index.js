import react from 'react'
import reactdom from 'react-dom'

class Hello extends react.Component {
    render() {
        return <h1> Hello World</h1>
    }
}

reactdom.render(<Hello/>, document.getElementById('root'));