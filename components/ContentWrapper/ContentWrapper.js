import className from 'classnames/bind';
import styles from './ContentWrapper.module.scss';
import {sanitize} from '../../utils/miscellaneous'

let cx = className.bind(styles);

export default function ContentWrapper({ content, children, className }) {
  return (
    <article className={cx(['component', className])}>
      <div dangerouslySetInnerHTML={{ __html: sanitize(content ?? '' )}} />
      {children}
    </article>
  );
}
