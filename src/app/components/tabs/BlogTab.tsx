import { AppContext } from "@/app/context/AppContext";
import React, { useContext } from "react";
import styles from "./BlogTab.module.css";

const BlogTab = () => {
  const { data } = useContext(AppContext);
  const { blogs } = data;

  return (
    <div>
      <div className={styles.blogTop}>
        <h4>EHAX Blogs</h4>
        <p>Full blogs from EHAX {":)"}</p>
        <a href="/blog" target="___blank">
         View All
        </a>
      </div>
      <>
        {blogs ? (
          blogs.map((blog) => (
            <div key={blog.name} className={styles.blog}>
              <h4>{blog.name}</h4>
              <p>{blog.about}</p>
              <a href={blog.link} target="___blank">
                Read More
              </a>
            </div>
          ))
        ) : (
          <p className={styles.text}>No events yet</p>
        )}
      </>
    </div>
  );
};

export default BlogTab;
