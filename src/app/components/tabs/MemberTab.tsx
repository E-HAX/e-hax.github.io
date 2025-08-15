import { MemberData } from "@/app/interface/AppContextInterface";
import React from "react";
import Button from "../Button";
import styles from "./MemberTab.module.css"
import { FaDiscord, FaGithub, FaInstagram, FaLink, FaLinkedin } from "react-icons/fa";

const MemberTab = ({ member }: { member: MemberData }) => {
  return (
    <>
      <pre className={styles.memberTabText}>
        <code>
          {member.ascii_art}
          <br />
          <br />
          <p className={styles.memberTabName}>{`>>> ${member.name}`}</p>
          <p className={styles.memberTabPosition}>{`Position: ${member.position}`}</p>
          <br />
          <p className={styles.memberTabAbout}>{member.about}</p>
        </code>
      </pre>
      <br />
      <br />

      <div className={styles.memberTabSocials}>
        {member.website && (
            <a
            href={member.website}
            target="__blank"
            className={styles.memberTabLink}
            draggable={false}
            >
            <Button>
                <FaLink size={18} />
            </Button>
            </a>
        )}
        {member.linkedin && (
            <a
            href={member.linkedin}
            target="__blank"
            className={styles.memberTabLink}
            draggable={false}
            >
            <Button>
                <FaLinkedin size={18} />
            </Button>
            </a>
        )}
        {member.instagram && (
            <a
            href={member.instagram}
            target="__blank"
            className={styles.memberTabLink}
            draggable={false}
            >
            <Button>
                <FaInstagram size={18} />
            </Button>
            </a>
        )}
        {member.github && (
            <a
            href={member.github}
            target="__blank"
            className={styles.memberTabLink}
            draggable={false}
            >
            <Button>
                <FaGithub size={18} />
            </Button>
            </a>
        )}
        {member.discord && (
            <a
            href={member.discord}
            target="__blank"
            className={styles.memberTabLink}
            draggable={false}
            >
            <Button>
                <FaDiscord size={18} />
            </Button>
            </a>
        )}
      </div>
    </>
  );
};

export default MemberTab;
