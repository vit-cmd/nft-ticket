import Style from './Modal.module.css';

export const Modal = ({ children, title }: any) => {
  return (
    <div className={Style.modal}>
      <div className={Style.modal_content}>
        <div className={Style.modal_header}>
          <div className={Style.modal_header_title}>{title}</div>
        </div>
        <div className={Style.body}>{children}</div>
      </div>
    </div>
  );
};
