import { useEffect, useState } from "react";
import {ReactComponent as ChevronLeft} from '../assets/others/chevron-left-solid.svg'
import {ReactComponent as ChevronRight} from '../assets/others/chevron-right-solid.svg'

const Slider = (props) => {
    const [displayedPicture, setDisplayedPicture] = useState(props.filename);
    const [currentPicture, setCurrentPicture] = useState(null);
    let touchStart = 0;
    
    const onClickLeft = (e) => {
        e?.stopPropagation();
        let pictures = props.loadedPictures;
        let currentIndex = pictures.indexOf(displayedPicture);
        return (currentIndex === 0) ? setDisplayedPicture(pictures[pictures.length-1]) : setDisplayedPicture(pictures[currentIndex-1]);
    }

    const onClickRight = (e) => {
        e?.stopPropagation();
        let pictures = props.loadedPictures;
        let currentIndex = pictures.indexOf(displayedPicture);
        return (currentIndex === pictures.length -1) ? setDisplayedPicture(pictures[0]) : setDisplayedPicture(pictures[currentIndex+1]);
    }

    const onHandleTouchStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        touchStart = e.touches[0].clientX
    }
    const onHandleTouchMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    const onHandleTouchEnd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const drag =  e.changedTouches[0].clientX - touchStart;

        if(Math.abs(drag) < 50) return props.closeSlider();
        return (drag > 0) ? onClickLeft() : onClickRight();
    }

    useEffect(() => {
        import('../assets/photos-original/' + displayedPicture)
        .then(pic => {
            setCurrentPicture(pic.default)
        })
    }, [displayedPicture])


    return(
        <div className="slider " 
        onClick={props.closeSlider} 
        onTouchStart={onHandleTouchStart} 
        onTouchMove={onHandleTouchMove}
        onTouchEnd={onHandleTouchEnd} 

        >

            <div className="chevron-left-container" onClick={onClickLeft}>
                <ChevronLeft className='chevron-left'/>
            </div>
            <div className="slider-image-container">
                <img 
                    src={currentPicture}
                    alt={displayedPicture}
                    className="slider-image"
                />
            </div>
            <div className="chevron-right-container" onClick={onClickRight}>
                <ChevronRight className='chevron-right'/>
            </div>
        </div>
    )
}

export default Slider;