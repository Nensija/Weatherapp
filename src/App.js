import "./styles.css";
import { useState } from "react";
import ButtonTime from "./ButtonTime";
import Week from "./Week";
import "./styles.css";
import weatherApiobject from "./Weatherapi";
import weatherHelper from "./WeatherHelper";
import { GlobalOutlined } from "@ant-design/icons";
import { Layout, Input, Button, Empty } from "antd";

const { Content } = Layout;
const { Search } = Input;
export default function App() {
  const [inputText, setinputText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showWeek, setShowWeek] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [warningText, setWarningText] = useState("");

  async function formatWeatherdata(searchtext) {
    let dayResult = await weatherApiobject.getWeatherToday(searchtext);

    if (dayResult.cod === "404") {
      setShowResult(false);
      setWeatherData({});
      setWarningText("Šī pilsēta nav atrasta ! Pamēģiniet atrast citu pilsētu");
      return;
    }

    let forecastResult = await weatherApiobject.getForestToday(searchtext);

    console.log(dayResult, forecastResult);
    let weatherDataFromApi = weatherHelper.formatData(
      dayResult,
      forecastResult
    );

    setShowResult(true);
    setWeatherData(weatherDataFromApi);
    setWarningText("");
  }
  function onSearch(value) {
    if (value.length === 0) return;
    formatWeatherdata(value);
  }

  function onWeekBtnClick() {
    setShowWeek(true);
  }

  return (
    <div className="App">
      <div className="app-title">
        <GlobalOutlined className="app-title-icon" />
        <span className="app-title-text">Laika apstākļu aplikācija</span>
      </div>
      <Layout className="main-layout">
        <Content>
          <div className="content-search-row">
            <Search placeholder="Pilsēta" onSearch={onSearch} enterButton />
            <div className="content-search-forecast">
              <Button onClick={onWeekBtnClick} disabled={!showResult}>
                Nedēļas prognoze
              </Button>
            </div>
          </div>
          {warningText.lenght > 0 && (
            <div className="waring-text">
              <Empty description={warningText} />
            </div>
          )}
        </Content>
      </Layout>
      {showResult && (
        <>
          <ButtonTime data={weatherData} />
          {showWeek && <Week data={weatherData} />}
        </>
      )}
      {warningText.lenght > 0 && <span> {warningText} </span>}
    </div>
  );
}
