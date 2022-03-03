import Link from "next/link";
import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Box, Container, Grid } from "theme-ui";
import { THEME_COLOR } from "constants/config";
import { SectionHeading } from "landing/components/section-heading";
import { trackEvent } from "utils/analytics";

const socialMediaData = [
  {
    name: "facebook",
    icon: <FaFacebook color={THEME_COLOR} />,
    link: "https://www.facebook.com/sharer/sharer.php?u=https://www.flat-me.com/?utm_source=facebook&utm_medium=social-media-share&utm_campaign=share-buttons",
  },
  {
    name: "linkedin",
    icon: <FaLinkedin color={THEME_COLOR} />,
    link: "https://www.linkedin.com/shareArticle?mini=true&url=https://www.flat-me.com/?utm_source=linkedin&utm_medium=social-media-share&utm_campaign=share-buttons",
  },
  {
    name: "twitter",
    icon: <FaTwitter color={THEME_COLOR} />,
    link: "https://twitter.com/share?url=https://www.flat-me.com/?utm_source=twitter&utm_medium=social-media-share&utm_campaign=share-buttons",
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
      fontSize: [20, 20, 20, 20, 25],
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
