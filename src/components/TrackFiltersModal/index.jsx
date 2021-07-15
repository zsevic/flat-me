import { SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Steps, message } from "antd";
import React, { useEffect, useState } from "react";
import * as usersService from "services/users";
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
  {
    title: "Kraj",
    description: "Pretraga je sačuvana",
  },
];

export const TrackFiltersModal = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const [current, setCurrent] = useState(0);

  let eventSource;

  const onFinish = async (values) => {
    const { email } = values;

    eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/sse?email=${email}`
    );

    eventSource.onerror = () => {
      message.error("Pretraga ne može da se sačuva, pokušajte kasnije");
      setVisible(false);
    };

    eventSource.onmessage = ({ data }) => {
      const eventData = JSON.parse(data);
      console.log('event data', eventData);
      if (eventData.isVerifiedEmail) {
        setCurrent(2);
      }
      if (eventData.isVerifiedFilter) {
        setVisible(3);
        eventSource.close();
      }
    };

    try {
      await usersService.registerUser(email);
    } catch {
      message.error("Email nije dobar");
      return;
    }

    setCurrent(1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const showModal = () => {
    setCurrent(0);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    form.resetFields();
    eventSource?.close();
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
        onCancel={closeModal}
        onOk={closeModal}
      >
        <Steps progressDot direction="vertical" current={current}>
          {steps.map((item) => (
            <Step
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </Steps>
        {current === 0 && (
          <Form
            name="email-form"
            {...formItemLayout}
            className="mb-5"
            form={form}
            onFinish={onFinish}
          >
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
            <Button type="primary" htmlType="submit">
              Registruj se
            </Button>
          </Form>
        )}
        {current === 1 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </Modal>
    </>
  );
};
