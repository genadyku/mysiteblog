import React from 'react'

import ChapterItem from './ChapterItem'

const ChapterList = ({ lessons }) => (
	<div>
		<div className='lessons-content__part'>Часть первая</div>
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
