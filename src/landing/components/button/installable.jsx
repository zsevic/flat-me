import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { RiInstallLine } from "react-icons/ri";
import { Button, Link } from "theme-ui";
import { APP_RELATIVE_URL, CTA_TEXT } from "constants/config";

let deferredPrompt;

export const InstallableButton = ({ sx }) => {
  const [installable, setInstallable] = useState(false);
  const handleInstallClick = () => {
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
      console.log("INSTALL: Success");
    });
  }, []);

  return installable ? (
    <Button onClick={handleInstallClick} sx={sx}>
      <RiInstallLine className="mr-1" /> Instaliraj FlatMe
    </Button>
  ) : (
    <Link href={APP_RELATIVE_URL}>
      <Button aria-label={CTA_TEXT} sx={sx}>
        {CTA_TEXT}
      </Button>
    </Link>
  );
};

InstallableButton.propTypes = {
  sx: PropTypes.object.isRequired,
};
