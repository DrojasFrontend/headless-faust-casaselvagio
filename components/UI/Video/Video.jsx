import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./Video.module.scss";
let cx = className.bind(styles);

const Video = ({ data }) => {
  const { videoSrc, autoplay = true, controls = true, loop = true, muted = true } = data;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <section className="Video">
      <div className={cx("component")}>
          <div className={cx("video-container")}>
            <video
              src={videoSrc}
              className={cx("video-frame")}
              autoPlay={autoplay}
              controls={!isMobile}
              loop={loop}
              muted={muted}
              playsInline
            ></video>
          </div>
      </div>
    </section>
  );
};

export default Video; 