import { MetaRecord } from "nextra";

const meta: MetaRecord = {
  index: {
    title: "Home",
    type: "page",
    theme: {
      layout: "full",
      toc: false,
      timestamp: false,
      sidebar: false,
      footer: false,
    },
  },
  docs: {
    title: "Docs",
    type: "page",
  },
  about: {
    title: "About",
    type: "page",
  },
};

export default meta;
