import React from 'react'

import AddArticleForm from '../../commons/AddArticleForm'

const AddArticlePage = () => (
	<div className='wraper'>
		<main className='main'>
			<div className='main-row'>
				<div className='wraper-left'>
					<div className='wraper-center-item'>
						<h3>Добавить статью</h3>
						<AddArticleForm />
					</div>
				</div>
			</div>
		</main>
	</div>
)

export default AddArticlePage
