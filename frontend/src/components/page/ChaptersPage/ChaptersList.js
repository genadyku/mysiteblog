import React from 'react'

import ChapterItem from './ChapterItem'

const ChapterList = ({ lessons }) => (
	<div>
		<ul>
			{lessons.map((chapter) => (
				<ChapterItem
					chapter={chapter}
					lessons={chapter.lessons}
					key={chapter._id}
				/>
			))}
		</ul>
	</div>
)

export default ChapterList
