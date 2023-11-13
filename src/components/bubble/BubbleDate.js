const BubbleDate = (props) => {
  return (
    <>
      <div className="bubble service is-date">
        <div className="bubble-content">
          <div className="service-msg">
            <span className="i18n" dir="auto">
              {props.msg}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BubbleDate;
