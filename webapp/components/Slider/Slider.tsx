import React, {useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {TiArrowLeftThick, TiArrowRightThick} from 'react-icons/ti';

//INTERNAL IMPORT
import Style from './Slider.module.css';
import SliderCard from './SliderCard/SliderCard';

export const Slider = (props: {id: number; cards: any[]; owner: string; widthScroll: number}) => {
  const [width, setWidth] = useState(0);
  const dragSlider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(dragSlider.current!.scrollWidth - dragSlider.current!.offsetWidth);
  }, []);

  const handleScroll = (direction: string) => {
    const {current} = dragSlider;
    const scrollAmount = window.innerWidth > props.widthScroll ? 300 : 250;

    if (direction == 'left') {
      current!.scrollLeft -= scrollAmount;
    } else {
      current!.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className={Style.slider}>
      <div className={Style.slider_box}>
        <div className={Style.slider_box_button}>
          <h2>List Ticket Type</h2>
          <div className={Style.slider_box_button_btn}>
            <div className={Style.slider_box_button_btn_icon} onClick={() => handleScroll('left')}>
              <TiArrowLeftThick />
            </div>
            <div className={Style.slider_box_button_btn_icon} onClick={() => handleScroll('right')}>
              <TiArrowRightThick />
            </div>
          </div>
        </div>

        <motion.div className={Style.slider_box_itmes} ref={dragSlider}>
          <motion.div
            className={Style.slider_box_item}
            drag="x"
            dragConstraints={{right: 0, left: -width}}
          >
            {props.cards.map((el, i) => (
              <SliderCard key={i + 1} el={el} i={i} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
