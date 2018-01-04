import React from 'react';

function CourseRow(props){
	// console.log(props.token);
	const course = props.courseInfo;
	const courseName = course.courseName;
	const courseDesc = course.desc;
	var button;
	var inStockClass;
	var inStock;

	if(props.token === undefined){
		// this user is not logged in
		button = ""
	}else{
		button = <button
						className="btn btn-primary"
						onClick={()=>{
							props.addToCart(props.token, product.productCode)
						}}
					>Add to cart</button>
	}
	if(product.quantityInStock > 100){
		inStockClass = "";
		inStock = "In Stock!"
	}else if(product.quantityInStock > 0){
		inStockClass = "bg-warning";
		inStock = 'Order Soon!'
	}else{
		inStockClass = "bg-danger";
		inStock = 'Out of stock!'
	}

	return(
		<tr>
			<td>{product.productName}</td>
			<td>{product.productScale}</td>
			<td>{product.productVendor}</td>
			<td>{product.productDescription}</td>
			<td className={inStockClass}>{inStock}</td>
			<td>${buyPrice}</td>
			<td>${MSRP}</td>
			<td>{button}</td>
		</tr>
	);
}

export default CourseRow;

<tr key={index}>
	<td>
		<Link to='/courseInfo' status={course.id}>{course.courseName}</Link>
	</td>
	<td>
		{course.desc}
	</td>
</tr>