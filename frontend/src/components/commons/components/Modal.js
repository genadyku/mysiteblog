import React from 'react'
import Draggable from 'react-draggable'
import './modal.css'

const Modal = ({ handleClose, handleDelete, show, children }) => {
	const showHideClassName = show ? 'modal display-block' : 'modal display-none'
	console.log('modal', showHideClassName)
	return (
		<Draggable>
			<div className={showHideClassName} draggable='true'>
				<section className='modal-main'>
					{children}
					<button
						type='button'
						className='modal-btn-del'
						onClick={handleDelete}
					>
						Удалить
					</button>
					<button
						type='button'
						className='modal-btn-cansel'
						onClick={handleClose}
					>
						Отмена
					</button>
				</section>
			</div>
		</Draggable>
	)
}
export default Modal
