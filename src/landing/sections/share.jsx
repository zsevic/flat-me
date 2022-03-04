import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaViber,
  FaWhatsapp,
} from "react-icons/fa";
import { Box, Container, Grid } from "theme-ui";
import { THEME_COLOR } from "constants/config";
import { SectionHeading } from "landing/components/section-heading";
import { trackEvent } from "utils/analytics";

const socialMediaData = [
  {
    name: "facebook",
    icon: <FaFacebook color={THEME_COLOR} />,
    link: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.flat-me.com%2F%3Futm_source%3Dfacebook%26utm_medium%3Dsocial-media-share%26utm_campaign%3Dshare-buttons",
  },
  {
    name: "linkedin",
    icon: <FaLinkedin color={THEME_COLOR} />,
    link: "https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fwww.flat-me.com%2F%3Futm_source%3Dlinkedin%26utm_medium%3Dsocial-media-share%26utm_campaign%3Dshare-buttons",
  },
  {
    name: "twitter",
    icon: <FaTwitter color={THEME_COLOR} />,
    link: "https://twitter.com/share?url=https%3A%2F%2Fwww.flat-me.com%2F%3Futm_source%3Dtwitter%26utm_medium%3Dsocial-media-share%26utm_campaign%3Dshare-buttons",
  },
  {
    name: "whatsapp",
    icon: <FaWhatsapp color={THEME_COLOR} />,
    link: "https://api.whatsapp.com/send?text=https%3A%2F%2Fwww.flat-me.com%2F%3Futm_source%3Dwhatsapp%26utm_medium%3Dsocial-media-share%26utm_campaign%3Dshare-buttons",
  },
  {
    name: "viber",
    icon: <FaViber color={THEME_COLOR} />,
    link: "viber://forward?text=Pogledaj%20ovu%20aplikaciju%2C%20moze%20dosta%20da%20ti%20pomogne%20u%20potrazi%20za%20stanom%20u%20Beogradu%20https%3A%2F%2Fwww.flat-me.com%2F%3Futm_source%3Dviber%26utm_medium%3Dsocial-media-share%26utm_campaign%3Dshare-buttons",
  },
];

const styles = {
  heading: {
    textAlign: "center",
    mb: ["15px"],
    h2: {
      fontSize: [
        "1.25rem",
        "1.25rem",
        "1.25rem",
        "1.25rem",
        "1.5rem",
        "1.5rem",
      ],
      lineHeight: [1.25, 1.5],
      letterSpacing: "-1.5px",
    },
  },

  socialMedia: {
    links: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    iconBox: {
      width: "2.5rem",
      height: "2.5rem",
      borderRadius: "30%",
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      fontSize: [20, 20, 20, 20, 20],
      fontWeight: 700,
      mb: "3rem",
      justifyContent: "center",
      boxShadow: "0px 14px 20px rgba(76, 119, 171, 0.1)",
      "@media screen and (max-width: 560px)": {
        borderRadius: 20,
      },
    },
  },
};

export const ShareSection = () => {
  return (
    <Box as="section" variant="section.shareSection" sx={styles.workflow}>
      <Container>
        <SectionHeading
          sx={styles.heading}
          title={<>Podelite FlatMe na svojim društvenim mrežama</>}
        />

        <Grid rows={1} sx={styles.socialMedia.links}>
          {socialMediaData.map((item) => (
            <Box key={`${item.name}-sharebutton`}>
              <Box
                sx={styles.socialMedia.iconBox}
                onClick={() =>
                  trackEvent(
                    "social-media-share",
                    `social-media-share-${item.name}`
                  )
                }
              >
                <Link href={item.link} passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    {item.icon}
                  </a>
                </Link>
              </Box>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
