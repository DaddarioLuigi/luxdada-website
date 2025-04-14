declare module '@mailchimp/mailchimp_marketing' {
  interface MailchimpConfig {
    apiKey: string;
    server: string;
  }

  interface MailchimpLists {
    addListMember: (listId: string, data: { email_address: string; status: string }) => Promise<any>;
  }

  interface MailchimpClient {
    setConfig: (config: MailchimpConfig) => void;
    lists: MailchimpLists;
  }

  const mailchimp: MailchimpClient;
  export default mailchimp;
} 