import { SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Steps, message } from "antd";
import React, { useEffect, useState } from "react";
import eventBus from "utils/event-bus";

const { Step } = Steps;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const steps = [
  {
    title: "E-mail",
    description: "Unesi e-mail adresu",
  },
  {
    title: "Verifikacija",
    description: "Potvrdi e-mail adresu",
  },
  {
    title: "Čuvanje",
    description: "Potvrdi sačuvanu pretragu",
  },
];

export const TrackFiltersModal = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    eventBus.on("changed-is-disabled", (data) => {
      setIsDisabled(data.isDisabled);
    });
  }, []);

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        size="large"
        disabled={isDisabled}
      >
        <SaveOutlined className="pb-1 align-middle" /> Sačuvaj pretragu
      </Button>
      <Modal
        title="Sačuvaj pretragu"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Steps progressDot current={current}>
          {steps.map((item) => (
            <Step
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </Steps>
        {current === 0 && (
          <Form name="email-form" {...formItemLayout} className="mb-5">
            <Form.Item
              name="email"
              label="E-mail adresa"
              className="mt-2"
              hasFeedback
              rules={[
                {
                  type: "email",
                  message: "Uneta e-mail adresa nije ispravna!",
                },
                {
                  required: true,
                  message: "Unesi e-mail adresu!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </Modal>
    </>
  );
};
