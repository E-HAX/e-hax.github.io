import React, { useEffect, useState } from "react";

const AboutTab = () => {
  const [i, setI] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setI(v => v == 0 ? 2 : 0)
        }, 800)

        return () => clearInterval(interval)
    }, []) 
  return (
    <div style={{ fontSize: "17px", textAlign: "center" }}>
      <br />
      <pre style={{ fontSize: "14px" }}>
        <code>{`${" ".repeat(i)}███████╗██╗  ██╗ █████╗ ██╗  ██╗\n██╔════╝██║  ██║██╔══██╗╚██╗██╔╝\n█████╗  ███████║███████║ ╚███╔╝ \n${" ".repeat(i*2)}██╔══╝  ██╔══██║██╔══██║ ██╔██╗ \n${" ".repeat(i)}███████╗██║  ██║██║  ██║██╔╝ ██╗\n${" ".repeat(i)}╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝`}</code>
      </pre>

      <br />
      <br />

      <p>
        EHAX is the official ethical hacking and cybersecurity society of DTU
        and its their official website
      </p>
    </div>
  );
};

export default AboutTab;
