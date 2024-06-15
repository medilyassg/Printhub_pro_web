import React from 'react';
import './banner.css';
import Banner1 from '../../images/0702WF-TR-752x376-Greeting-Cards.jpg';
import Banner2 from '../../images/0702WF-TR-752x376-Business-Cards.jpg';
import Banner3 from '../../images/0702WF-TR-752x376-Stickers.jpg';

const Banner = () => {
    return (
        <>
            <div className="bannerSection">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="box">
                                <img src={Banner1} className='w-100 transitions' alt="Poster"/>
                                <div className="overlay"></div>
                                <button className="seeMoreBtn">See More</button>
                                <div className="description">High-quality posters for all your needs</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box">
                                <img src={Banner2} className='w-100 transitions' alt="Stickers"/>
                                <div className="overlay"></div>
                                <button className="seeMoreBtn">See More</button>
                                <div className="description">Custom stickers and post-it notes</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box">
                                <img src={Banner3} className='w-100 transitions' alt="Notebook"/>
                                <div className="overlay"></div>
                                <button className="seeMoreBtn">See More</button>
                                <div className="description">Personalized notebooks and journals</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;
