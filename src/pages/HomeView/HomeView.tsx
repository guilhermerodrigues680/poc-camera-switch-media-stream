import { VERSION_INFO } from "../../config/version-info";
import CameraSwitch from "../../modules/media-stream/components/CameraSwitch";

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

        <div>
          <CameraSwitch />
        </div>
      </section>
    </>
  );
}

export default HomeView;
