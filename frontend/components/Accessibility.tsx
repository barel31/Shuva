export default function Accessibility() {
  return (
    <>
      <script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossOrigin="anonymous"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
nl_pos = "bl";
nl_dir = "assets/nl-files/";
nl_contact = "n:${process.env.NEXT_PUBLIC_CONTACT_NAME}|p:${process.env.NEXT_PUBLIC_CONTACT_PHONE}|u:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}|f:${process.env.NEXT_PUBLIC_CONTACT_FAX}";
`,
        }}
      />
      <script src="plugins/nagishli.js?v=2.3" defer></script>
    </>
  );
}
