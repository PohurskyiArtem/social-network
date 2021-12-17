import React from 'react'

import icons from './icons.svg'

const Icon = ({ name }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
		>
			<use xlinkHref={`${icons}#${name}`} />
		</svg>
	)
}

export default Icon;