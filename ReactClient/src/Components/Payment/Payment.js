import { useState } from 'react';
import './Payment.css';

import StripeContainer from './StripeContainer';

function Payment() {
	const [showItem, setShowItem] = useState(false);
	return (
		<div className='App1'>
			<h1 className='stripeh'>Flight Payment</h1>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
					<h3>$100</h3>					
					<button className='btn1' onClick={() => setShowItem(true)}>Purchase Flight</button>
				</>
			)}
		</div>
	);
}

export default Payment;