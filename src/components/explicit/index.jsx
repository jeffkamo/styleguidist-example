import React from 'react'
import PropTypes from 'prop-types'

/**
 * Demonstrates that explicit returns cause the component to fail at
 * generating docs.
 */

const Explicit = ({children}) => {
    return (
        <div>{children}</div>
    )
}

Explicit.propTypes = {
    children: PropTypes.node
}

export default Explicit
