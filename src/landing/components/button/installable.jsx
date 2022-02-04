import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { RiInstallLine } from "react-icons/ri";
import { Button, Link } from "theme-ui";
import { APP_RELATIVE_URL, CTA_TEXT } from "constants/config";
import { trackEvent } from "utils/analytics";

let deferredPrompt;

export const InstallableButton = ({ sx, buttonId }) => {
  const [installable, setInstallable] = useState(false);
  const handleInstallClick = () => {
    trackEvent("install-app", `install-app-${buttonId}`);
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredPrompt = event;
      setInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      setInstallable(false);
      trackEvent("app-installed", "app-installed", "installation");
    });
  }, []);

  return installable ? (
    <Button onClick={handleInstallClick} sx={sx}>
      <RiInstallLine className="mr-1" /> Instaliraj FlatMe
    </Button>
  ) : (
    <Link href={APP_RELATIVE_URL}>
      <Button
        aria-label={CTA_TEXT}
        sx={sx}
        onClick={() =>
          trackEvent("find-apartment", `find-apartment-${buttonId}`)
        }
      >
        {CTA_TEXT}
      </Button>
    </Link>
  );
};

InstallableButton.propTypes = {
  sx: PropTypes.object.isRequired,
  buttonId: PropTypes.string.isRequired,
};
