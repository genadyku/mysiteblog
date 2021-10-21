import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

import Code from '../../utils/Code'

import SidebarPage from '../SidebarPage'
import Error from '../../utils/Error'
import { fetchLessonSlug } from '../../../ducks/lesson'

const LessonPage = ({
	match,
	lesson: { lesson, loading, error },
	fetchLessonSlug,
}) => {
	const { slug } = match.params
	useEffect(() => {
		fetchLessonSlug(slug)
		Prism.highlightAll()
	}, [fetchLessonSlug, slug])

	return loading && lesson ? (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col col-lg-2'>
					<SidebarPage
						chapter_id={lesson.chapterId.chapter_id}
						chapter_slug={lesson.chapterId.slug}
						chapter1={lesson.chapterId.chapter1}
					/>
				</div>
				<div className='col col-lg-8'>
					<div className='lesson-id'>
						<h4 className='list-group-item-heading'>{lesson.title}</h4>
						<div className='post'>
							<Code text={lesson.textf} />
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className='container'>
			<div className='row'>
				{error && <Error text={error.message} code={error.error.statusCode} />}
			</div>
		</div>
	)
}

export default connect((state) => ({ lesson: state.lesson }), {
	fetchLessonSlug,
})(LessonPage)
