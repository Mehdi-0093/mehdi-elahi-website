export interface Publication {
  authors: string;
  title: string;
  venue: string;
  year: string;
  pages?: string;
  status: "Published" | "Submitted";
  doi?: string;
  url?: string;
}

/** The author name highlighted (bolded) wherever it appears in author lists. */
export const highlightedAuthor = "M. Elahi";

export const publications: Publication[] = [
  {
    authors: "M. Elahi, M. R. Elshamy, A.-H. Badawy, A. Patooghy",
    title:
      "SentinelEdge: An Attention-Based Defense for Real-Time Mitigation of Adversarial Thermal Manipulations in System-on-Chips",
    venue: "ACM Transactions on Embedded Computing Systems (TECS)",
    year: "2026",
    status: "Published",
    doi: "10.1145/3802543",
    url: "https://doi.org/10.1145/3802543",
  },
  {
    authors: "M. Elahi, A. Badawy, A. Patooghy",
    title:
      "DriverHammer: Hardware-Assisted RowHammer via Covert Wordline Driver Amplification in DRAM",
    venue: "Proc. IEEE/ACM Intl. Conf. on Computer-Aided Design (ICCAD)",
    year: "2026",
    status: "Submitted",
  },
  {
    authors: "M. Elahi, M. R. Elshamy, A.-H. Badawy, A. Patooghy",
    title:
      "iThermTroj: Exploiting Intermittent Thermal Trojans in Multi-Processor System-on-Chips",
    venue: "Proc. IEEE 68th Intl. Midwest Symp. on Circuits and Systems (MWSCAS)",
    year: "2025",
    pages: "912–916",
    status: "Published",
    doi: "10.1109/MWSCAS53549.2025.11244435",
    url: "https://doi.org/10.1109/MWSCAS53549.2025.11244435",
  },
  {
    authors: "M. Elahi, H. S. Shahhosseini",
    title:
      "LTD-Router: Low Latency Traffic Distributed FPGA Based Router Architecture Using Dedicated Paths",
    venue: "Proc. Iranian Conf. on Electrical Engineering (ICEE), Mashhad, Iran",
    year: "2018",
    pages: "1601–1606",
    status: "Published",
    doi: "10.1109/ICEE.2018.8472707",
    url: "https://doi.org/10.1109/ICEE.2018.8472707",
  },
];
