import sql from '../../img/sql.png'
import javascript from '../../img/javascript.png'
import css from '../../img/css.png'
import nodejs from '../../img/nodejs.png'
import reactjs from '../../img/reactjs.jpg'
import redux from '../../img/redux.png'

const images = {
	sql,
	javascript,
	css,
	nodejs,
	reactjs,
	redux,
}

export const getImageByKey = (key) => images[key]
