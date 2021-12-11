import { useEffect, useState } from "react";
import {ReactComponent as ChevronUp} from '../assets/others/chevron-circle-up-solid.svg'


const ScrollUp = (props) => {

    const[visible, setVisible] = useState(false);

    const handleScroll = () => {
        return (window.scrollY > 200) ? setVisible(true) : setVisible(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return (
        <div className="scroll-up-container">
            {visible &&
                <div className="scroll-up" onClick={() => window.scrollTo({top: 0,behavior: 'smooth'})}>
                    <ChevronUp className='chevron-up'/>
                </div>
            }
        </div>
    )
} 

export default ScrollUp;