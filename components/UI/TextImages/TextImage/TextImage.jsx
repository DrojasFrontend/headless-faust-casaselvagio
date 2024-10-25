import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import className from "classnames/bind";
import styles from "./TextImage.module.scss";
let cx = className.bind(styles);

import { ListItem } from "../../ListItem";
import { Container } from "../../../Layout/Container";

const TextImage = ({ data }) => {
  const { items } = data;

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const openLightbox = (index, images) => {
    setPhotoIndex(index);
    setCurrentImages(images); // Guardamos las imágenes actuales del item
    setIsOpen(true);
  };

  return (
    <section className="sectionTextImage">
      <div className={cx("component")}>
        <Container>
          {items?.map((item, index) => (
            <div
              key={index}
              className={cx(["grid", item?.estilo])}
            >
              <div className={cx("content")}>
                <h2 className="heading--40 color--primary">{item?.titulo}</h2>
                <div
                  className="heading--16 color--gray"
                  dangerouslySetInnerHTML={{ __html: item?.descripcion }}
                />
                <div className={cx("listitems")}>
                  {item?.items &&
                    item?.items?.length > 0 &&
                    item?.items?.map((listItem, idx) => (
                      <div key={idx}>
                        <ListItem data={listItem} />
                      </div>
                    ))}
                </div>
                {item?.cta && (
                  <Link href={item?.cta?.url}>
                    <a className="button button--primary">{item?.cta.title}</a>
                  </Link>
                )}
              </div>
              <div className={cx("img")} onClick={() => openLightbox(index, item?.imagen)}>
                <Slider {...settings}>
                  {item?.imagen?.map((img, idx) => (
                    <div key={idx} className={cx("slide")}>
                      <Image
                        src={img?.mediaItemUrl}
                        layout="fill"
                        quality={100}
                        priority
                        objectFit="cover"
                        alt={img?.altText}
                        title={img?.title}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          ))}

          {isOpen && currentImages?.length > 0 && (
            <Lightbox
              mainSrc={currentImages[photoIndex]?.mediaItemUrl}
              nextSrc={
                currentImages[(photoIndex + 1) % currentImages?.length]?.mediaItemUrl
              }
              prevSrc={
                currentImages[
                  (photoIndex + currentImages?.length - 1) % currentImages?.length
                ]?.mediaItemUrl
              }
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() =>
                setPhotoIndex(
                  (photoIndex + currentImages?.length - 1) % currentImages?.length
                )
              }
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % currentImages?.length)
              }
            />
          )}
        </Container>
      </div>
    </section>
  );
};

export default TextImage;
