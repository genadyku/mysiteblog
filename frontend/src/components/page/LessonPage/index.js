import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

import Code from '../../utils/Code'

import LessonSidebarPage from '../LessonSidebarPage'
import BreadcrumbsPage from '../BreadcrumbsPage'

import Error from '../../utils/Error'
import { fetchLessonSlug } from '../../../ducks/lesson'

const LessonPage = ({
	match,
	lesson: { lesson, loading, error },
	fetchLessonSlug,
}) => {
	const { slug } = match.params
	console.log('LessonPage:', error)
	useEffect(() => {
		fetchLessonSlug(slug)
		Prism.highlightAll()
	}, [fetchLessonSlug, slug])

	const renderPage = (lesson, loading, error) => {
		if (!loading && lesson) {
			return (
				<div className='wraper'>
					<div className='chapter'>
						<div className='main-row'>
							<div className='sidebar'>
								<LessonSidebarPage
									chapter_id={lesson.chapterId.chapter_id}
									chapter_slug={lesson.chapterId.slug}
									chapter1={lesson.chapterId.chapter1}
								/>
							</div>
							<div className='chapter-lesson'>
								<BreadcrumbsPage />
								<h4>{lesson.title}</h4>
								<div className='post'>
									<Code text={lesson.textf} />
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
		if (error) {
			return <Error text={error.message} code={error.error.statusCode} />
		}
		return (
			<div className='wraper'>
				<main className='main'>
					<div className='main-row'>
						<div className='loadingspinner' />
					</div>
				</main>
			</div>
		)
	}

	return renderPage(lesson, loading, error)
}

export default connect((state) => ({ lesson: state.lesson }), {
	fetchLessonSlug,
})(LessonPage)
