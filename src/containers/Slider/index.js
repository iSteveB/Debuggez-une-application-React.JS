import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) || [];

  useEffect(() => {
    if (byDateDesc.length === 0) return;

    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
    }, 5000);

  }, [index, byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((eventData, eventIndex) => (
        <div key={eventData.title}>
          <div
            className={`SlideCard SlideCard--${
              index === eventIndex ? "display" : "hide"
            }`}
          >
            <img src={eventData.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{eventData.title}</h3>
                <p>{eventData.description}</p>
                <div>{getMonth(new Date(eventData.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIndex) => (
                <input
                  key={`${eventData.title}-${radioIndex + 1}`}
                  type="radio"
                  name="radio-button"
                  onChange={() => setIndex(radioIndex)}
                  checked={index === radioIndex}
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