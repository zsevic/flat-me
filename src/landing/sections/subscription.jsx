import { message } from "antd";
import { rgba } from "polished";
import React, { useState } from "react";
import { Box, Button, Container, Flex, Grid, Input } from "theme-ui";
import {
  emailNotValidErrorMessage,
  tooManyRequestsErrorMessage,
} from "constants/error-messages";
import {
  BAD_REQUEST_STATUS_CODE,
  TOO_MANY_REQUESTS_STATUS_CODE,
} from "constants/status-codes";
import { trackEvent } from "utils/analytics";
import { SectionHeading } from "landing/components/section-heading";
import { subscribeByEmail } from "services/subscriptions";

const styles = {
  section: {
    backgroundColor: "#2F5392",
    pt: "60px",
    pb: "70px",
  },
  heading: {
    color: "#fff",
    mb: [30, 30, 50],
    h2: {
      fontSize: [22, 28, "36px"],
      lineHeight: 1.4,
      letterSpacing: "heading",
      color: "#fff",
    },
    p: {
      lineHeight: [2, 3.12],
      mt: [20, 0],
      letterSpacing: "heading",
      color: rgba("#fff", 0.6),
    },
  },
  content: {
    maxWidth: "555px",
    margin: "0 auto",
    textAlign: "center",
  },
  grid: {
    mx: "auto",
  },
  form: {
    alignItems: "center",
    display: ["block", "flex"],
    input: {
      backgroundColor: rgba("#fff", 0.08),
      borderRadius: "5px",
      borderColor: "transparent",
      color: rgba("#fff", 0.8),
      flexGrow: 1,
      fontFamily: "body",
      height: "auto",
      px: "30px",
      py: "0",
      textAlign: ["center", "left"],
      minHeight: [50, 50, 60],
      width: ["100%", "auto"],
      "::placeholder": {
        color: rgba("#fff", 0.8),
      },
    },
    button: {
      backgroundColor: "#fff",
      color: "#020718",
      minHeight: [50, 50, 60],
      fontSize: [14, 16],
      padding: "0 30px",
      whiteSpace: "nowrap",
      width: ["100%", "auto"],
      ml: [0, 3],
      mt: [4, 0],
      ":hover": {
        backgroundColor: "#fff",
        color: "#020718",
      },
    },
  },
};

const errorMessages = {
  [BAD_REQUEST_STATUS_CODE]: emailNotValidErrorMessage,
  [TOO_MANY_REQUESTS_STATUS_CODE]: tooManyRequestsErrorMessage,
};

export const Subscription = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!email) return message.error("Unesite svoj email");
      await subscribeByEmail(email);
      trackEvent("email-subscription", "email-subscription");
      return message.success("Uspešno ste se prijavili na FlatMe obaveštenja");
    } catch (error) {
      const errorMessage =
        errorMessages[error?.response?.status] || "Prijava nije uspela";
      return message.error(errorMessage);
    }
  };

  const onChange = (event) => setEmail(event.target.value);

  return (
    <Box as="section" sx={styles.section}>
      <Container>
        <Box sx={styles.content}>
          <SectionHeading
            sx={styles.heading}
            title={<>Prijavite se na FlatMe obaveštenja</>}
            description="Budite prvi koji će saznati sve o novostima u vezi FlatMe aplikacije"
          />
          <Flex as="form" sx={styles.form} onSubmit={handleSubmit}>
            <Grid gap={2} columns={[1, "2fr 1fr"]} sx={styles.grid}>
              <Input
                type="email"
                id="email"
                onChange={onChange}
                placeholder="Unesite svoj email"
              />
              <Button variant="white">Prijavi me</Button>
            </Grid>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};
