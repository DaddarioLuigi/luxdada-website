# Luxdada Website

A modern website with a coming soon page that collects email subscriptions using Mailchimp.

## Features

- Responsive design
- Countdown timer
- Email subscription form integrated with Mailchimp
- Social media links
- Beautiful UI with animations

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Mailchimp account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Setting up Mailchimp

1. Sign up for a Mailchimp account at [mailchimp.com](https://www.mailchimp.com/)
2. Create a new audience (list) in Mailchimp
3. Get your API key:
   - Go to Account > Extras > API keys
   - Create a new API key
4. Get your List ID:
   - Go to Audience > All Contacts
   - Click on "Settings" in the upper right
   - Click on "Audience name and defaults"
   - Scroll down to find your Audience ID (this is your List ID)
5. Create a `.env.local` file in the root directory with the following content:
   ```
   MAILCHIMP_API_KEY=your-api-key-here
   MAILCHIMP_LIST_ID=your-list-id-here
   MAILCHIMP_SERVER_PREFIX=us1  # Replace with your server prefix (e.g., "us1" for US server)
   ```
   Replace `your-api-key-here` and `your-list-id-here` with your actual Mailchimp API key and List ID.

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 