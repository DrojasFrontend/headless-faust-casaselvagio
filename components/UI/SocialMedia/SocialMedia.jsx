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
        <a><IconInstagram /></a>
      </Link>
      <Link className="" href="/">
        <a><IconFacebook /></a>
      </Link>
      <Link className="" href="/">
        <a><IconYoutube /></a>
      </Link>
      <Link className="" href="/">
        <a><IconWaze /></a>
      </Link>
      <Link className="" href="/">
        <a><IconWhatsapp /></a>
      </Link>
    </>
  );
};

export default SocialMedia;
