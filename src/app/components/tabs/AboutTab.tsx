import React, { useEffect, useState } from "react";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Button from "../Button";

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
      <pre style={{ fontSize: "16px" }}>
        <code>{`${" ".repeat(i)}███████╗██╗  ██╗ █████╗ ██╗  ██╗\n██╔════╝██║  ██║██╔══██╗╚██╗██╔╝\n█████╗  ███████║███████║ ╚███╔╝ \n${" ".repeat(i*2)}██╔══╝  ██╔══██║██╔══██║ ██╔██╗ \n${" ".repeat(i)}███████╗██║  ██║██║  ██║██╔╝ ██╗\n${" ".repeat(i)}╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝`}</code>
      </pre>

      <br />
      <br />

      <p>
        EHAX is the official ethical hacking and cybersecurity society of DTU
        and its their official website
      </p>
      <br />
      {/* <p>contact@ehax.in</p> */}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", marginTop: "25px" }}>
        <a draggable={false} href="https://www.instagram.com/ehax_dtu/" target="__insta"><Button style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FaInstagram size={28} /></Button></a>
        <a draggable={false} href="https://www.linkedin.com/company/ehax/posts/?feedView=all" target="__linkedin"><Button style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FaLinkedin size={28} /></Button></a>
        <a draggable={false} href="https://github.com/E-HAX/" target="__github"><Button style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FaGithub size={28} /></Button></a>
        <a draggable={false} href="mailto:ehaxdce@gmail.com" target="__mail"><Button style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FaEnvelope size={28} /></Button></a>
      </div>
    </div>
  );
};

export default AboutTab;

