import { Collapse } from "antd";
import React, { useState } from "react";
import { trackEvent } from "utils/analytics";

const { Panel } = Collapse;

export const ImmediateNotificationsSection = () => {
  const panelKey = "immediate-notifications";
  const [activeKey, setActiveKey] = useState();
  const onChange = (key) => {
    if (key !== activeKey && key === panelKey) {
      trackEvent(
        "immediate-notifications-in-progress",
        "immediate-notifications-in-progress"
      );
    }
    setActiveKey(key);
  };

  return (
    <Collapse accordion onChange={onChange} activeKey={activeKey}>
      <Panel
        key={panelKey}
        header="Da li želite da primate obaveštenja čim se pojavi novi stan na tržištu?"
      >
        <p>
          Drago nam je što možemo da Vas obavestimo da ćete uskoro moći da
          koristite novu funkcionalnost u okviru FlatMe veb aplikacije, kojom
          ćete umesto jednom dnevno, dobijati obaveštenja čim se novi stan
          pojavi na tržištu. Kada ova funkcionalnost bude bila dostupna,
          dobićete instrukcije na koji način ćete moći da je aktivirate.
        </p>
      </Panel>
    </Collapse>
  );
};
