import "./styles.css";
import weatherHelper from "./WeatherHelper";
import { Card } from "antd";
import {
  CloudDownloadOutlined,
  CompassOutlined,
  SwapOutlined,
  CompressOutlined
} from "@ant-design/icons";

export default function ButtonTime(props) {
  const { data } = props;
  let iconSrc = "https://openweathermap.org/img/wn/" + data.icon + "@2x.png";

  console.log(data);

  return (
    <>
      <Card>
        <div className="today-layout-title">
          {data.weekday} ({data.time})
        </div>
        <div className="today-layout-content">
          <div className="today-layout-content-part1">
            <div className="today-layout-content-part1-city">
              {data.city}({data.country}),{data.iconTooltip}
            </div>
            <div className="today-layout-content-part1-img">
              <img
                src={weatherHelper.getIconUrl(data.icon, 4)}
                alt="Nav bildes"
                title={data.iconTooltip}
              />
              <div className="today-layout-content-part1-temp">
                {data.temperature}°C
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div>
        {data.temperature} °C Pēc sajūtām - {data.feels_like_temparature}°C
      </div>

      <div>
        {data.hours &&
          data.hours.length > 0 &&
          data.hours.map((item, index) => {
            return (
              <div>
                {item.name}
                {item.temperature}
              </div>
            );
          })}
      </div>
      {data.weekday}
      {data.time}
      <div>Vēja virziens: {data.windDirection}</div>
      <div> Vēja ātrums: {data.windSpeed}</div>
    </>
  );
}
