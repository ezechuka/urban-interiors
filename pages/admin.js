import React, { useState } from 'react';
import { firebase } from '../firebase';

const Admin = () => {
	const [category, setCategory] = useState(0);
	const [description, setDescription] = useState(0);
	const [height, setHeight] = useState(0);
	const [subcategory, setSubCategory] = useState(0);
	const [width, setWidth] = useState(0);
	const [color, setColor] = useState({});
	const [img, setImg] = useState([]);
	const [length, setLength] = useState(0);
	const [price, setPrice] = useState(0);
	const [title, setTitle] = useState(0);

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
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 flex flex-col w-1/2 mx-auto" onSubmit={handleSubmit}>
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
				<label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Sub Category:</label>
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
				onChange={(event) => setColor(event.target.value)}
			/>

		</form>
	)

}

export default Admin