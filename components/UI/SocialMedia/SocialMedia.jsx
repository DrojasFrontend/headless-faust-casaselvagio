import React from "react";
import Link from "next/link";

import className from "classnames/bind";
import styles from "./SocialMedia.module.scss";
let cx = className.bind(styles);

import IconInstagram from "../../SVG/IconInstagram";
import IconFacebook from "../../SVG/IconFacebook";
import IconYoutube from "../../SVG/IconYoutube";
import IconWaze from "../../SVG/IconWaze";
import IconWhatsapp from "../../SVG/IconWhatsapp";

const SocialMedia = () => {
  return (
    <>
      <Link className="" href="/">
        <IconInstagram />
      </Link>
      <Link className="" href="/">
        <IconFacebook />
      </Link>
      <Link className="" href="/">
        <IconYoutube />
      </Link>
      <Link className="" href="/">
        <IconWaze />
      </Link>
      <Link className="" href="/">
        <IconWhatsapp />
      </Link>
    </>
  );
};

export default SocialMedia;
