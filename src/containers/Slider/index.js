import { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { getMonth } from '../../helpers/Date';

import './style.scss';

const Slider = () => {
	const { data } = useData();
	const [index, setIndex] = useState(0);
	const [selectedRadio, setSelectedRadio] = useState(0);

	const byDateDesc =
		data?.focus?.sort((eventA, eventB) =>
			new Date(eventA.date) < new Date(eventB.date) ? -1 : 1
		) || [];

	const handleRadioInput = (radioIndex) => {
		setSelectedRadio(radioIndex);
		setIndex(radioIndex);
	};
  
  const changeIndex = () => {
    if (byDateDesc.length === 0) return;

    setIndex((current) =>
      current < byDateDesc.length - 1 ? current + 1 : 0
    );

    setSelectedRadio((current) =>
      current < byDateDesc.length - 1 ? current + 1 : 0
    );
  };

	useEffect(() => {

		const interval = setTimeout(() => changeIndex(), 5000);

		return () => clearTimeout(interval);
	}, [index, byDateDesc]);

	return (
		<div className='SlideCardList'>
			{byDateDesc.map((eventData, eventIndex) => (
				<div key={eventData.title}>
					<div
						className={`SlideCard SlideCard--${
							index === eventIndex ? 'display' : 'hide'
						}`}>
						<img src={eventData.cover} alt='forum' />
						<div className='SlideCard__descriptionContainer'>
							<div className='SlideCard__description'>
								<h3>{eventData.title}</h3>
								<p>{eventData.description}</p>
								<div>{getMonth(new Date(eventData.date))}</div>
							</div>
						</div>
					</div>
					<div className='SlideCard__paginationContainer'>
						<div className='SlideCard__pagination'>
							{byDateDesc.map((_, radioIndex) => (
								<input
									key={`${eventData.title}-${radioIndex + 1}`}
									type='radio'
									name='radio-button'
									onChange={() => {
										handleRadioInput(radioIndex)
									}}
									checked={selectedRadio === radioIndex}
								/>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Slider;
