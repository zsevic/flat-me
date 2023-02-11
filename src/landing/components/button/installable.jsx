import PropTypes from "prop-types";
import React from "react";
import { FaGooglePlay } from "react-icons/fa";
import { Button, Link } from "theme-ui";
import { GOOGLE_PLAY_STORE_URL } from "constants/config";
import { trackEvent } from "utils/analytics";

export const InstallableButton = ({ sx, buttonId }) => {
  const handleInstallClick = () => {
    trackEvent(
      "install-google-play-app",
      `install-google-play-app-${buttonId}`
    );
  };

  return (
    <Link href={GOOGLE_PLAY_STORE_URL}>
      <Button onClick={handleInstallClick} sx={sx}>
        <FaGooglePlay className="mr-1" /> Instaliraj FlatMe
      </Button>
    </Link>
  );
};

InstallableButton.propTypes = {
  sx: PropTypes.object.isRequired,
  buttonId: PropTypes.string.isRequired,
};
