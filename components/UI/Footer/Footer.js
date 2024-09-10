import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
let cx = classNames.bind(styles);

export default function Footer() {

  return (
    <footer className={cx('component')}>
      <h2>Casaselvaggio</h2>
      <small>Sustainable eco-villas</small>
    </footer>
  );
}
