import React from 'react'
import PropTypes from 'prop-types'

/**
 * Demonstrates that implicit returns have no issues generating docs.
 */

const Implicit = ({children}) => (
    <div>{children}</div>
)

Implicit.propTypes = {
    children: PropTypes.node
}

export default Implicit
