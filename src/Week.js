import "./styles.css";

export default function Week(props) {
  const { data } = props;

  console.log(data);

  return (
    <>
      {data.days && data.days.length > 0 && (
        <div>
          {data.days.map((item, index) => {
            return (
              <div key={index}>
                {item.name} {item.date} {item.min_temp}
                {item.min_icon}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
