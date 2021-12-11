import { useEffect, useState, useRef } from "react";
import * as GalleryManager from "../utilities/galleryManager";
import {filenames} from "../assets/filenames.json"
import Slider from "./Slider";


const Gallery = (props) => {
    let picWitdh = 22; //picture width in rem
    const [colNumber, setColNumber] = useState(0);
    const [loadedPictures, setLoadedPictures] = useState([]);
    const [needPicture, setNeedPicture] = useState([]);
    const [sliderPicture, setSliderPicture] = useState(null);
    const obsDiv = useRef([]);
    

    // IO CALLBACK ----------------------------------------------//
    const IntersectionHandler = (entries,observer) => {
        let needed = [...needPicture];
        let highest = Infinity;

        entries.forEach(entry => {
            let columnNumber = Number(entry.target.dataset.column);

            if(entry.isIntersecting){
                let entryTop = entry.target.getBoundingClientRect().top;
                if(entryTop < highest){
                    highest = entryTop;
                    needed.unshift(columnNumber);
                    needed = [...new Set(needed)];
                }else{
                    needed.push(columnNumber)
                    needed = [...new Set(needed)];
                }
            }else{
                if(needed.includes(columnNumber)) {
                    needed.splice(needed.indexOf(columnNumber),1);
                }
            }
        })
        
        if(needed.length !== 0){
            obsDiv.current.forEach(obs => {
                observer.unobserve(obs);
            })
            setNeedPicture(needed);
        }
        
    }
    
    let observer = new IntersectionObserver(IntersectionHandler);

    //  COMPONENT DID MOUNT ---------------------------------------//
    useEffect(() => {
        
        if(!colNumber) setColNumber(GalleryManager.getColNumber(picWitdh));

        obsDiv.current.forEach(obs => {
            observer.observe(obs);
        })

    }, [colNumber])

    // On image loaded : Authorize IO to observe again ------------//
    const onLoadPicture = (filename) => {
        obsDiv.current.forEach(obs =>{
            observer.observe(obs);
        })
        setLoadedPictures([...loadedPictures, filename])
    }

    // TRIGGER FOR NEW PICTURE ---------------------------------- //
    // (takes IntersectionObserver response)
    useEffect(() => {
        observer.disconnect();

        if(filenames.length === loadedPictures.length){
            observer.disconnect();
            document.querySelectorAll('.gallery-column').forEach(col => col.classList.add('static'));
            return;
        }

        if(!needPicture.length){
            obsDiv.current.forEach(obs =>{
                observer.observe(obs)
            })
            return;
        }

        const addPicture = async (columnNumber, filename) => {
            let img = document.createElement('img');
            let picture = await import(`../assets/photos/${filename}`);
            
            img.onload = ()=>onLoadPicture(filename);
            img.src = picture.default;
            img.onclick = () => setSliderPicture(filename);
            
            let parentNode = document.querySelector(`.column-${columnNumber}`);
            parentNode.insertBefore(img, parentNode.lastChild);
        }

        let filename = filenames[loadedPictures.length];
        addPicture(needPicture[0],filename);
        
    },[needPicture])

    
    // --------------- RENDER ---------------------------//
    return(
        <section className="gallery" >
            {colNumber && [...Array(colNumber)].map((e,i) => {
                return(
                <div key={i} className={`gallery-column column-${i}`}>
                    <div ref={ref => {obsDiv.current[i] = ref}} data-column={i} className={`observer observer-${i}`}></div>
                </div>
                )
            })}
            {sliderPicture &&
                <Slider 
                loadedPictures={loadedPictures} 
                filename={sliderPicture}
                closeSlider={()=>setSliderPicture(null)}
                />
            }
        </section>
    )
}

export default Gallery;
