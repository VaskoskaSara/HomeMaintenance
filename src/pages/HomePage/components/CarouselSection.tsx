import React from "react";
import { Carousel, Button } from "antd";
import { carouselImages } from "../HomePageData";
import "../style.css";

const CarouselSection: React.FC = () => {
  return (
    <Carousel effect="fade" autoplay>
      {carouselImages.map((image, index) => (
        <div className="relative text-center">
          <img
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-[700px] block object-cover"
          />
          <div className="absolute bottom-[11%] left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 p-2.5 rounded-md text-lg">
            <article>
              <h3>
                You are on right place because we make your life easier.
                Join us.
              </h3>
              <p>Looking for someone to complete an obligation in your home?</p>
              <footer className="text-center mt-4">
                <Button type="primary" size="large" href="/services" className="bg-darkgoldenrod">
                  Explore services
                </Button>
              </footer>
            </article>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselSection;
