import { VERSION_INFO } from "../../config/version-info";

function HomeView() {
  function getVersionInfoTxt() {
    const { appName, appVersion, appMode } = VERSION_INFO;
    return `${appName} v${appVersion} (${appMode})`;
  }

  return (
    <>
      <section>
        <h3>HomeView</h3>
        <small>{getVersionInfoTxt()}</small>
      </section>
    </>
  );
}

export default HomeView;
