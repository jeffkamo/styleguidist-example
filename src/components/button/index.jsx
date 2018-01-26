import React from 'react'
import PropTypes from 'prop-types'

/**
 * Description of the button
 */

// const Button = ({children}) => (
//     <div>{children}</div>
// )

const Button = ({children}) => {
    return (
        <div>{children}</div>
    )
}

Button.propTypes = {
    children: PropTypes.node
}

export default Button
