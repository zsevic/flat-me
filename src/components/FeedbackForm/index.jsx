import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Radio,
  Row,
  Space,
  Spin,
} from "antd";
import React, { useState } from "react";
import {
  BAD_REQUEST_STATUS_CODE,
  TOO_MANY_REQUESTS_STATUS_CODE,
} from "constants/status-codes";
import * as feedbacksService from "services/feedbacks";

const errorMessages = {
  [BAD_REQUEST_STATUS_CODE]: "Uneti tekst nije ispravan",
  [TOO_MANY_REQUESTS_STATUS_CODE]: "Prekoračen je broj pokušaja",
};

export const FeedbackForm = () => {
  const [feedbackValue, setFeedbackValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormShown, setIsFormShown] = useState(true);

  const FEEDBACK_OPTIONS = [
    "Hoću da promenim sačuvani filter",
    "Našao/našla sam stan",
    "Nisam zadovoljan/zadovoljna stanovima koji stižu u obaveštenjima",
    "Ništa od navedenog",
  ];

  const onFinish = async (values) => {
    try {
      let text = FEEDBACK_OPTIONS[values.feedbackOption];
      if (values.feedbackText) {
        text += `, ${values.feedbackText}`;
      }
      setIsLoading(true);
      await feedbacksService.sendFeedback({
        text,
      });
      setIsLoading(false);
      setIsFormShown(false);
      notification.info({
        description: "Hvala na povratnoj informaciji",
      });
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        errorMessages[error?.response?.status] || "Došlo je do greške";

      notification.error({
        description: errorMessage,
      });
    }
  };

  function onChange(event) {
    setFeedbackValue(event.target.value);
  }

  return (
    <>
      {isFormShown && (
        <Row
          justify="center"
          align="top"
          className="bg-gray-50 px-3 mt-5 mx-auto"
        >
          <Spin spinning={isLoading}>
            <Form name="feedback-form" onFinish={onFinish}>
              <p className="text-center my-4">
                Ukoliko želiš da podeliš sa nama razlog za isključivanje
                obaveštenja, ispod možeš da uneseš utiske
              </p>
              <Col>
                <Form.Item
                  name="feedbackOption"
                  rules={[
                    {
                      required: true,
                      message: "Izaberi neku od ponuđenih opcija",
                    },
                  ]}
                >
                  <Row>
                    <Radio.Group onChange={onChange} value={feedbackValue}>
                      <Space direction="vertical">
                        {FEEDBACK_OPTIONS.map((option, index) => (
                          <Radio
                            key={`feedback-option-${option}`}
                            value={index}
                          >
                            {option}
                          </Radio>
                        ))}
                      </Space>
                    </Radio.Group>
                  </Row>
                </Form.Item>
                {feedbackValue === 3 && (
                  <Form.Item name="feedbackText">
                    <Input.TextArea />
                  </Form.Item>
                )}
              </Col>

              <Col className="text-center mx-1">
                <Form.Item>
                  <Button type="primary" htmlType="submit" size="small">
                    Pošalji utiske
                  </Button>
                </Form.Item>
              </Col>
            </Form>
          </Spin>
        </Row>
      )}
    </>
  );
};
