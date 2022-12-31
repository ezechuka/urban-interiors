import React, { useState } from 'react';
import { firebase } from '../firebase';

const Admin = () => {
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [height, setHeight] = useState('');
	const [subcategory, setSubCategory] = useState('');
	const [width, setWidth] = useState('');
	const [color, setColor] = useState({});
	const [img, setImg] = useState([]);
	const [length, setLength] = useState('');
	const [price, setPrice] = useState('');
	const [title, setTitle] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		const product = {
			category,
			desc: description,
			subcategory,
			width,
			color,
			height,
			img,
			length,
			price,
			title
		};

		firebase
			.firestore()
			.collection('products')
			.add(product)
			.then(() => {
				setCategory('');
				setDescription('');
				setHeight('');
				setImg([]);
				setLength('');
				setPrice('');
				setTitle('');
			});
	};

	return (
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col" onSubmit={handleSubmit}>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category:</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					id="category"
					value={category}
					onChange={(event) => setCategory(event.target.value)}
				/>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
				<textarea
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="description"
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">Height:</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="number"
					id="height"
					value={height}
					onChange={(event) => setHeight(event.target.value)}
				/>
			</div>

			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">subCategory:</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					id="subCategory"
					value={subcategory}
					onChange={(event) => setSubCategory(event.target.value)}
				/>
			</div>



			<label htmlFor="width">Width:</label>
			<input
				type="number"
				id="width"
				value={width}
				onChange={(event) => setWidth(event.target.value)}
			/>
			<br />
			<label htmlFor="color">Color:</label>
			<input
				type="color"
				id="color"
				value={color}
				onChange={(event) => setWidth(event.target.value)}
			/>

		</form>
	)

}

export default Admin